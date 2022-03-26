import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllowsStatus(status) {
  const { data } = await axios.get(`${dailyallowances_url}?fi=${status}`);
  //const { data } = await axios.get(`${dailyallowances_url}`);
  return data;
}

export function useDailyAllowsStatus(empid) {
  const [filter, setFilter] = useState("all");
  const [dailyAllowsStatusId, setDailyAllowsStatusId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: dailyallowsstatus = fallback } = useQuery(
    [queryKeys.dailyallowstatus, dailyAllowsStatusId],

    () => getDailyAllowsStatus(dailyAllowsStatusId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return {
    dailyallowsstatus,
    filter,
    setFilter,
    setDailyAllowsStatusId,
  };
}
