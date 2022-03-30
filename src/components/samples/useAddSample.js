import { useMutation, useQueryClient } from "react-query";
import { samples_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addSample(data) {
  await fetch(samples_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddSample(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addSample(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("samples");
      toast({
        title: "Sample being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
