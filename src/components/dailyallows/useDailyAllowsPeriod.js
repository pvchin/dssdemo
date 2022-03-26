import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllowsPeriod(period) {
  const { data } = await axios.get(`${dailyallowances_url}?fv=${period}`);
  return data;
}

export function useDailyAllowsPeriod() {
  const [filter, setFilter] = useState("all");
  const [dailyallowsperiodId, setDailyAllowsPeriodId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: dailyallowsperiod = fallback } = useQuery(
    [queryKeys.dailyallowsperiod, dailyallowsperiodId],
    //queryKeys.dailyallows,
    () => getDailyAllowsPeriod(dailyallowsperiodId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return {
    dailyallowsperiod,
    filter,
    setFilter,
    setDailyAllowsPeriodId,
  };
}
