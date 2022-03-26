import { useMutation, useQueryClient } from "react-query";
import { currency_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteCurrency(id) {
  await fetch(currency_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteCurrency(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteCurrency(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("currency");
      toast({
        title: "Currency item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
