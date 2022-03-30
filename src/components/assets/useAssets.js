import { useQuery } from "react-query";
import { assets_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getAssets() {
  const { data } = await axios.get(`${assets_url}`);
  return data;
}

export function useAssets() {
  const fallback = [];
  const { data: assets = fallback } = useQuery(
    queryKeys.assets,
    getAssets
  );

  return { assets };
}
