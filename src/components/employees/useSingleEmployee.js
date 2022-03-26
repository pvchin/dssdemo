import React, { useState } from "react";
import { useQuery } from "react-query";
import { employees_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getSingleEmployee(singleEmployeeId) {
  const { data } = await axios.get(`${employees_url}?id=${singleEmployeeId}`);
  return data;
}

export function useSingleEmployee() {
  const [singleEmployeeId, setSingleEmployeeId] = useState("");
  const fallback = [];
  const { data: singleemployee = fallback } = useQuery(
    [queryKeys.singleemployee, singleEmployeeId],
    () => getSingleEmployee(singleEmployeeId)
  );
  return { singleemployee, setSingleEmployeeId };
}
