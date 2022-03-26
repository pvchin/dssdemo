import { useMutation, useQueryClient } from "react-query";
import { currency_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addCurrency(data) {
  await fetch(currency_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddCurrency(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addCurrency(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("currency");
      toast({
        title: "Currency item being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
