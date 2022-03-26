import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { payitems_url } from "../../utils/constants";
import { filterByType } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getPayItems(id) {
  const { data } = await axios.get(`${payitems_url}?fi=${id}`);
  //const { data } = await axios.get(`${payitems_url}`);
  return data;
}

export function usePayItems(empid) {
  const [payitemsfilter, setPayItemsFilter] = useState("all");
  const [payitemId, setPayItemId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByType(unfiltered, payitemsfilter),
    [payitemsfilter]
  );

  const fallback = [];
  const { data: payitems = fallback } = useQuery(
    [queryKeys.payitems, { payitemId }],
    //queryKeys.payitems,
    () => getPayItems(payitemId),
    {
      select: payitemsfilter !== "all" ? selectFn : undefined,
    }
  );

  return { payitems, payitemsfilter, setPayItemsFilter, setPayItemId };
}
