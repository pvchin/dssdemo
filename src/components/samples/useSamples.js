import { useQuery } from "react-query";
import { samples_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getSamples() {
  const { data } = await axios.get(`${samples_url}`);
  return data;
}

export function useSamples() {
  const fallback = [];
  const { data: samples = fallback } = useQuery(queryKeys.samples, getSamples);

  return { samples };
}
