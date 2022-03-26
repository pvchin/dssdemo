import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hocwhydetails_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHocwhydetails(id) {
  const { data } = await axios.get(`${hocwhydetails_url}?fv=${id}`);
  return data;
}

export function useHocwhydetails(empid) {
  const [filter, setFilter] = useState("all");
  const [hocwhydetailsId, setHocwhydetailsId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hocwhydetails = fallback } = useQuery(
    [queryKeys.hocwhydetails, { hocwhydetailsId }],
    () => getHocwhydetails(hocwhydetailsId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hocwhydetails, filter, setFilter, setHocwhydetailsId };
}
