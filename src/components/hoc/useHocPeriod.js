import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hoc_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHocPeriod(hocperiodMthId, hocperiodYrId) {
  const { data } = await axios.get(
    `${hoc_url}?m=${hocperiodMthId}&y=${hocperiodYrId}`
  );
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useHocPeriod(payrun) {
  const [hocperiodfilter, setHocPeriodFilter] = useState("all");
  const [hocperiodYrId, setHocPeriodYrId] = useState("");
  const [hocperiodMthId, setHocPeriodMthId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, hocperiodfilter),
    [hocperiodfilter]
  );

  const fallback = [];
  const { data: hocperiod = fallback } = useQuery(
    [queryKeys.hocperiod, hocperiodMthId, hocperiodYrId],
    //queryKeys.expenses_payrun,
    () => getHocPeriod(hocperiodMthId, hocperiodYrId),
    {
      select: hocperiodfilter !== "all" ? selectFn : undefined,
    }
  );

  return {
    hocperiod,
    hocperiodfilter,
    setHocPeriodFilter,
    setHocPeriodYrId,
    setHocPeriodMthId,
  };
}
