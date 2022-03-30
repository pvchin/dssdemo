import { useMutation, useQueryClient } from "react-query";
import { items_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteItem(id) {
  await fetch(items_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteItem(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteItem(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      toast({
        title: "Item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
