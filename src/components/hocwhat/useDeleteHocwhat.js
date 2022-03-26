import { useMutation, useQueryClient } from "react-query";
import { hocwhat_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHocwhat(id) {
  await fetch(hocwhat_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHocwhat(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHocwhat(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhat");
      toast({
        title: "HOC What record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
