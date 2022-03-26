import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { expenses_url } from "../../utils/constants";
import { filterByStatus } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getExpensesStatus(status) {
  const { data } = await axios.get(`${expenses_url}?fi=${status}`);
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useExpensesStatus(payrun) {
  const [expstatusfilter, setExpStatusFilter] = useState("all");
  const [expstatusId, setExpStatusId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByStatus(unfiltered, expstatusfilter),
    [expstatusfilter]
  );

  const fallback = [];
  const { data: expensesstatus = fallback } = useQuery(
    [queryKeys.expensesstatus, expstatusId],
    //queryKeys.expenses_payrun,
    () => getExpensesStatus(expstatusId),
    {
      select: expstatusfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    expensesstatus,
    expstatusfilter,
    setExpStatusFilter,
    setExpStatusId,
  };
}
