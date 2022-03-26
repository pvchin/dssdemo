import { useMutation, useQueryClient } from "react-query";
import { hoclookup_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHoclookup(data) {
  await fetch(hoclookup_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHoclookup(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHoclookup(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoclookup");
      toast({
        title: "HOC Lookup record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
