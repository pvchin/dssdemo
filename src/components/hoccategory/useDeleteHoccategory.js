import { useMutation, useQueryClient } from "react-query";
import { hoccategory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHoccategory(id) {
  await fetch(hoccategory_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHoccategory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHoccategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoccategory");
      toast({
        title: "HOC category record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
