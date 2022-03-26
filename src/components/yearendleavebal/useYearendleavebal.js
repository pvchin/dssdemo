import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { yearendleavebal_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getYearendleavebal(yrleaveId) {
  const { data } = await axios.get(`${yearendleavebal_url}?em=${yrleaveId}`);
  //const { data } = await axios.get(`${leaves_url}`);
  return data;
}

export function useYearendleavebal(empid) {
  const [filter, setFilter] = useState("all");
  const [yrleaveId, setYrLeaveId] = useState("");
  const [yrleaveYr, setYrLeaveYr] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: yearendleavebal = fallback } = useQuery(
    [queryKeys.yearendleavebal, yrleaveId],
    //queryKeys.leaves,
    () => getYearendleavebal(yrleaveId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { yearendleavebal, filter, setFilter, setYrLeaveId };
}
