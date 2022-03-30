import { useMutation, useQueryClient } from "react-query";
import { samples_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteSample(id) {
  await fetch(samples_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteSample(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteSample(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("samples");
      toast({
        title: "Sample being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
