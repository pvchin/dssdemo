import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hoc_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHoc(empid) {
  const { data } = await axios.get(`${hoc_url}?fv=${empid}`);
  return data;
}

export function useHoc(empid) {
  const [filter, setFilter] = useState("all");
  const [hocId, setHocId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hoc = fallback } = useQuery(
    [queryKeys.hoc, { hocId }],
    () => getHoc(hocId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hoc, filter, setFilter, setHocId };
}
