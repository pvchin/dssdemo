import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllowsPayrun(payrun) {
  const { data } = await axios.get(`${dailyallowances_url}?pr=${payrun}`);
  return data;
}

export function useDailyAllowsPayrun() {
  const [filter, setFilter] = useState("all");
  const [dailyallowspayrunId, setDailyAllowsPayrunId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: dailyallowspayrun = fallback } = useQuery(
    [queryKeys.dailyallowspayrun, dailyallowspayrunId],
    //queryKeys.dailyallows,
    () => getDailyAllowsPayrun(dailyallowspayrunId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return {
    dailyallowspayrun,
    filter,
    setFilter,
    setDailyAllowsPayrunId,
  };
}
