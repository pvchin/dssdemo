import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hoclookup_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHoclookup(empid) {
  const { data } = await axios.get(`${hoclookup_url}?fv=${empid}`);
  return data;
}

export function useHoclookup(empid) {
  const [filter, setFilter] = useState("all");
  const [hoclookupId, setHoclookupId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hoclookup = fallback } = useQuery(
    [queryKeys.hoclookup, { hoclookupId }],
    () => getHoclookup(hoclookupId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hoclookup, filter, setFilter, setHoclookupId };
}
