import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllows(empid, period) {
  const { data } = await axios.get(
    `${dailyallowances_url}??em=${empid}&pe=${period}`
  );
  //const { data } = await axios.get(`${dailyallowances_url}`);
  return data;
}

export function useDailyAllowsBatch(empid) {
  const [filter, setFilter] = useState("all");
  const [dailyAllowsPayrunId, setDailyAllowsPayrunId] = useState("");
  const [dailyAllowsEmpId, setDailyAllowsEmpId] = useState("");
  

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: dailyallows = fallback } = useQuery(
    [queryKeys.dailyallows, dailyAllowsPayrunId, dailyAllowsEmpId],
    //queryKeys.dailyallows,
    () => getDailyAllows(dailyAllowsPayrunId, dailyAllowsPayrunId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return {
    dailyallows,
    filter,
    setFilter,
    setDailyAllowsPayrunId,
    setDailyAllowsEmpId,
   
  };
}
