import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hocwhat_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHocwhat(id) {
  const { data } = await axios.get(`${hocwhat_url}?fv=${id}`);
  return data;
}

export function useHocwhat(empid) {
  const [filter, setFilter] = useState("all");
  const [hocwhatId, setHocwhatId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hocwhat = fallback } = useQuery(
    [queryKeys.hocwhat, { hocwhatId }],
    () => getHocwhat(hocwhatId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hocwhat, filter, setFilter, setHocwhatId };
}
