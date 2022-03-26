import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hocwhy_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHocwhy(id) {
  const { data } = await axios.get(`${hocwhy_url}?fv=${id}`);
  return data;
}

export function useHocwhy(empid) {
  const [filter, setFilter] = useState("all");
  const [hocwhyId, setHocwhyId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hocwhy = fallback } = useQuery(
    [queryKeys.hocwhy, { hocwhyId }],
    () => getHocwhy(hocwhyId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hocwhy, filter, setFilter, setHocwhyId };
}
