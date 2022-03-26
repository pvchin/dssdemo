import { useMutation, useQueryClient } from "react-query";
import { hocwhy_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHocwhy(id) {
  await fetch(hocwhy_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHocwhy(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHocwhy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhy");
      toast({
        title: "HOC Why record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
