import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { leaves_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getLeavesPeriod(leaveperiodMthId, leaveperiodYrId) {
  const { data } = await axios.get(
    `${leaves_url}?m=${leaveperiodMthId}&y=${leaveperiodYrId}`
  );
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useLeavesPeriod(payrun) {
  const [leaveperiodfilter, setLeavePeriodFilter] = useState("all");
  const [leaveperiodYrId, setLeavePeriodYrId] = useState("");
  const [leaveperiodMthId, setLeavePeriodMthId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, leaveperiodfilter),
    [leaveperiodfilter]
  );

  const fallback = [];
  const { data: leavesperiod = fallback } = useQuery(
    [queryKeys.leavesperiod, leaveperiodMthId, leaveperiodYrId],
    //queryKeys.expenses_payrun,
    () => getLeavesPeriod(leaveperiodMthId, leaveperiodYrId),
    {
      select: leaveperiodfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    leavesperiod,
    leaveperiodfilter,
    setLeavePeriodFilter,
    setLeavePeriodYrId,
    setLeavePeriodMthId,
  };
}
