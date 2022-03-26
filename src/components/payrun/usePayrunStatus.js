import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { payrun_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getPayrunStatus(status) {
  const { data } = await axios.get(`${payrun_url}?fi=${status}`);
  //const { data } = await axios.get(`${payrun_url}`);
  return data;
}

export function usePayrunStatus(empid) {
  const [filter, setFilter] = useState("all");
  const [payrunstatusId, setPayrunStatusId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: payrunstatus = fallback } = useQuery(
    [queryKeys.payrunstatus, { payrunstatusId }],
    //queryKeys.payrun,
    () => getPayrunStatus(payrunstatusId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { payrunstatus, filter, setFilter, setPayrunStatusId };
}
