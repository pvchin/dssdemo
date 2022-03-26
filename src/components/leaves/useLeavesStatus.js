import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { leaves_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getLeavesPeriod(leavestatusId) {
  const { data } = await axios.get(`${leaves_url}?fi=${leavestatusId}`);
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useLeavesStatus(leavesId) {
  const [leavestatusfilter, setLeaveStatusFilter] = useState("all");
  const [leavestatusId, setLeaveStatusId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, leavestatusfilter),
    [leavestatusfilter]
  );

  const fallback = [];
  const { data: leavesstatus = fallback } = useQuery(
    [queryKeys.leavesstatus, leavestatusId],
    //queryKeys.expenses_payrun,
    () => getLeavesPeriod(leavestatusId),
    {
      select: leavestatusfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    leavesstatus,
    leavestatusfilter,
    setLeaveStatusFilter,
    setLeaveStatusId,
  };
}
