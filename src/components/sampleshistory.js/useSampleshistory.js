import { useQuery } from "react-query";
import { sampleshistory_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getSampleshistory() {
  const { data } = await axios.get(`${sampleshistory_url}`);
  return data;
}

export function useSampleshistory() {
  const fallback = [];
  const { data: sampleshistory = fallback } = useQuery(queryKeys.sampleshistory, getSampleshistory);

  return { sampleshistory };
}
