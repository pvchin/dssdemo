import { useMutation, useQueryClient } from "react-query";
import { hoclocation_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHoclocation(id) {
  await fetch(hoclocation_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHoclocation(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHoclocation(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoclocation");
      toast({
        title: "HOC location record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
