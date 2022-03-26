import { useMutation, useQueryClient } from "react-query";
import { hoclookup_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHoclookup(data) {
  const { id, ...fields } = data;

  await fetch(hoclookup_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHoclookup(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHoclookup(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoclookup");
      toast({
        title: "HOC lookup record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
