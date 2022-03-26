import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowsdetls_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllowsDetlsBatch(empid, period) {
  const { data } = await axios.get(
    `${dailyallowsdetls_url}?fv=${empid}&pe=${period}`
  );
  //const { data } = await axios.get(`${dailyallowsdetls_url}`);
  return data;
}

export function useDailyAllowsDetlsBatch(empid) {
  const [dailyAllowsDetlsfilter, setDailyAllowsDetlsFilter] = useState("all");
  const [dailyAllowsDetlsId, setDailyAllowsDetlsId] = useState("");
  const [dailyAllowsDetlsPeriod, setDailyAllowsDetlsPeriod] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, dailyAllowsDetlsfilter),
    [dailyAllowsDetlsfilter]
  );

  const fallback = [];
  const { data: dailyallowsdetls = fallback, isLoading } = useQuery(
    [queryKeys.dailyallowsdetls, dailyAllowsDetlsId, dailyAllowsDetlsPeriod],
    //queryKeys.dailyallowsdetls,
    () => getDailyAllowsDetlsBatch(dailyAllowsDetlsId, dailyAllowsDetlsPeriod),
    {
      select: dailyAllowsDetlsfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    isLoading,
    dailyallowsdetls,
    dailyAllowsDetlsfilter,
    setDailyAllowsDetlsFilter,
    setDailyAllowsDetlsId,
    setDailyAllowsDetlsPeriod,
  };
}
