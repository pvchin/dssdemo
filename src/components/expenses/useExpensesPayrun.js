import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { expenses_url } from "../../utils/constants";
import { filterByPayrun } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getExpensesPayrun(payrun) {
  const { data } = await axios.get(`${expenses_url}?pr=${payrun}`);
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useExpensesPayrun(payrun) {
  const [expfilter, setExpFilter] = useState("all");
  const [exppayrunId, setExpPayrunId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByPayrun(unfiltered, expfilter),
    [expfilter]
  );

  const fallback = [];
  const { data: expensespayrun = fallback } = useQuery(
    [queryKeys.expensespayrun, exppayrunId],
    //queryKeys.expenses_payrun,
    () => getExpensesPayrun(exppayrunId),
    {
      select: expfilter !== "all" ? selectFn : undefined,
    }
  );

  return { expensespayrun, expfilter, setExpFilter, setExpPayrunId };
}
