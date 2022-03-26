import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hoclocation_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHoclocation(hoclocationId) {
  const { data } = await axios.get(`${hoclocation_url}?fv=${hoclocationId}`);
  //const { data } = await axios.get(`${hoclocation_url}`);
  return data;
}

export function useHoclocation(empid) {
  const [filter, setFilter] = useState("all");
  const [hoclocationId, setHoclocationId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hoclocation = fallback } = useQuery(
    [queryKeys.hoclocation, hoclocationId],
    () => getHoclocation(hoclocationId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hoclocation, filter, setFilter, setHoclocationId };
}
