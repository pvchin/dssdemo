import { useMutation, useQueryClient } from "react-query";
import { itemshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateItemshistory(data) {
  const { id, ...fields } = data;

  await fetch(itemshistory_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateItemshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateItemshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("itemshistory");
      toast({
        title: "Item history being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
