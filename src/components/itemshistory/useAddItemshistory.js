import { useMutation, useQueryClient } from "react-query";
import { itemshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addItemshistory(data) {
  await fetch(itemshistory_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddItemshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addItemshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("itemshistory");
      toast({
        title: "Item history being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
