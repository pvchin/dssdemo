import { useMutation, useQueryClient } from "react-query";
import { itemshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteItemshistory(id) {
  await fetch(itemshistory_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteItemshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteItemshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("itemshistory");
      toast({
        title: "Item history being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
