import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hocwhatdetails_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHocwhatdetails(id) {
  const { data } = await axios.get(`${hocwhatdetails_url}?fv=${id}`);
  return data;
}

export function useHocwhatdetails(empid) {
  const [filter, setFilter] = useState("all");
  const [hocwhatdetailsId, setHocwhatdetailsId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hocwhatdetails = fallback } = useQuery(
    [queryKeys.hocwhatdetails, { hocwhatdetailsId }],
    () => getHocwhatdetails(hocwhatdetailsId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hocwhatdetails, filter, setFilter, setHocwhatdetailsId };
}
