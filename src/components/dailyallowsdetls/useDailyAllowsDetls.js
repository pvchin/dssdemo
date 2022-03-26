import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowsdetls_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllowsDetls(empid) {
  // const { data } = await axios.get(
  //   `${dailyallowsdetls_url}?fv=${dailyAllowsDetlsId}&pe=${dailyAllowsDetlsPeriod}`
  // );
  const { data } = await axios.get(`${dailyallowsdetls_url}?em=${empid}`);
  return data;
}

export function useDailyAllowsDetls(empid) {
  const [dailyAllowsDetlsfilter, setDailyAllowsDetlsFilter] = useState("all");
  const [dailyAllowsDetlsId, setDailyAllowsDetlsId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, dailyAllowsDetlsfilter),
    [dailyAllowsDetlsfilter]
  );

  const fallback = [];
  const { data: dailyallowsdetls = fallback } = useQuery(
    //[queryKeys.leaves, dailyAllowsDetlsId, dailyAllowsDetlsPeriod],
    queryKeys.dailyallowsdetls,
    () => getDailyAllowsDetls(dailyAllowsDetlsId),
    {
      select: dailyAllowsDetlsfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    dailyallowsdetls,
    dailyAllowsDetlsfilter,
    setDailyAllowsDetlsFilter,
    setDailyAllowsDetlsId,
  };
}
