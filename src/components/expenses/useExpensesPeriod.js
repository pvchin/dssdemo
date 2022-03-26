import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { expenses_url } from "../../utils/constants";
import { filterByStatus } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getExpensesPeriod(expperiodMthId, expperiodYrId) {
  const { data } = await axios.get(`${expenses_url}?m=${expperiodMthId}&y=${expperiodYrId}`);
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useExpensesPeriod(payrun) {
  const [expperiodfilter, setExpPeriodFilter] = useState("all");
    const [expperiodYrId, setExpPeriodYrId] = useState("");
     const [expperiodMthId, setExpPeriodMthId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByStatus(unfiltered, expperiodfilter),
    [expperiodfilter]
  );

  const fallback = [];
  const { data: expensesperiod = fallback } = useQuery(
    [queryKeys.expensesperiod, expperiodMthId, expperiodYrId],
    //queryKeys.expenses_payrun,
      () => getExpensesPeriod(expperiodMthId,expperiodYrId),
    {
      select: expperiodfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    expensesperiod,
    expperiodfilter,
    setExpPeriodFilter,
    setExpPeriodYrId,
    setExpPeriodMthId,
  };
}
