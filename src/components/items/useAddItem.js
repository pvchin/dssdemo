import { useMutation, useQueryClient } from "react-query";
import { items_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addItem(data) {
  await fetch(items_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddItem(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addItem(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("items");
      toast({
        title: "Item being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
