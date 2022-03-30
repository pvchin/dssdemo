import { useQuery } from "react-query";
import { items_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getItems() {
  const { data } = await axios.get(`${items_url}`);
  return data;
}

export function useItems() {
  const fallback = [];
  const { data: items = fallback } = useQuery(queryKeys.items, getItems);

  return { items };
}
