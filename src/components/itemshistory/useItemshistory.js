import { useQuery } from "react-query";
import { itemshistory_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getItemshistory() {
  const { data } = await axios.get(`${itemshistory_url}`);
  return data;
}

export function useItemshistory() {
  const fallback = [];
  const { data: itemshistory = fallback } = useQuery(queryKeys.itemshistory, getItemshistory);

  return { itemshistory };
}
