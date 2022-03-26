import { useMutation, useQueryClient } from "react-query";
import { hoc_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHoc(id) {
  await fetch(hoc_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHoc(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHoc(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoc");
      toast({
        title: "Hoc record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
