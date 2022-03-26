import { useQuery } from "react-query";
import { currency_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getCurrency() {
  const { data } = await axios.get(`${currency_url}`);
  return data;
}

export function useCurrency() {
  const fallback = [];
  const { data: currency = fallback } = useQuery(
    queryKeys.currency,
    getCurrency
  );

  return { currency };
}
