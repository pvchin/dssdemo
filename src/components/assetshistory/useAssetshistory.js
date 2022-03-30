import { useQuery } from "react-query";
import { assetshistory_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getAssetshistory() {
  const { data } = await axios.get(`${assetshistory_url}`);
  return data;
}

export function useAssetshistory() {
  const fallback = [];
  const { data: assetshistory = fallback } = useQuery(queryKeys.assetshistory, getAssetshistory);

  return { assetshistory };
}
