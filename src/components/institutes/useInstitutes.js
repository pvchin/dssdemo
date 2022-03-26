import { useQuery } from "react-query";
import { institutes_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getInstitutes() {
  const { data } = await axios.get(`${institutes_url}`);
  return data;
}

export function useInstitutes() {
  const fallback = [];
  const { data: institutes = fallback } = useQuery(
    queryKeys.institutes,
    getInstitutes
  );

  return { institutes };
}
