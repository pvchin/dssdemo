import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { employees_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getEmployees(empid) {
  const { data } = await axios.get(`${employees_url}?al=${empid}`);
  //const { data } = await axios.get(`${employees_url}`);
  return data;
}

export function useAllEmployees(empid) {
  const [filter, setFilter] = useState("all");
  const [allempId, setAllEmpId] = useState("111");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: allemployees = fallback } = useQuery(
    [queryKeys.allemployees],
    () => getEmployees(allempId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { allemployees, filter, setFilter, setAllEmpId };
}
