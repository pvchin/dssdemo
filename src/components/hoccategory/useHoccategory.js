import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hoccategory_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHoccategory(hoccategoryId) {
  const { data } = await axios.get(`${hoccategory_url}?fv=${hoccategoryId}`);
  //const { data } = await axios.get(`${hoclocation_url}`);
  return data;
}

export function useHoccategory(empid) {
  const [filter, setFilter] = useState("all");
  const [hoccategoryId, setHoccategoryId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hoccategory = fallback } = useQuery(
    [queryKeys.hoccategory, hoccategoryId],
    () => getHoccategory(hoccategoryId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hoccategory, filter, setFilter, setHoccategoryId };
}
