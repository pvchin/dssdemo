import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { yearendleavebal_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getYearendleavebalPeriod(yrleaveperiodYrId) {
  const { data } = await axios.get(
    `${yearendleavebal_url}?fv=${yrleaveperiodYrId}`
  );
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useYearendleavebalPeriod(payrun) {
  const [yrleaveperiodfilter, setYrLeavePeriodFilter] = useState("all");
  const [yrleaveperiodYrId, setYrLeavePeriodYrId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, yrleaveperiodfilter),
    [yrleaveperiodfilter]
  );

  const fallback = [];
  const { data: yearendleavebalperiod = fallback } = useQuery(
    [queryKeys.leavesperiod, yrleaveperiodYrId],
    //queryKeys.expenses_payrun,
    () => getYearendleavebalPeriod(yrleaveperiodYrId),
    {
      select: yrleaveperiodfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    yearendleavebalperiod,
    yrleaveperiodfilter,
    setYrLeavePeriodFilter,
    setYrLeavePeriodYrId,
  };
}
