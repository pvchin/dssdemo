import { useMutation, useQueryClient } from "react-query";
import { samples_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateSample(data) {
  const { id, ...fields } = data;

  await fetch(samples_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateSample(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateSample(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("samples");
      toast({
        title: "Sample being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
