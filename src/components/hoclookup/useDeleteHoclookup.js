import { useMutation, useQueryClient } from "react-query";
import { hoclookup_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHoclookup(id) {
  await fetch(hoclookup_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHoclookup(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHoclookup(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoclookup");
      toast({
        title: "HOC lookup record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
