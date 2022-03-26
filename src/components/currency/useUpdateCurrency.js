import { useMutation, useQueryClient } from "react-query";
import { currency_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateCurrency(data) {
  const { id, ...fields } = data;

  await fetch(currency_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateCurrency(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateCurrency(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("currency");
      toast({
        title: "Currency item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
