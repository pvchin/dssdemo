import { useMutation, useQueryClient } from "react-query";
import { sampleshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateSampleshistory(data) {
  const { id, ...fields } = data;

  await fetch(sampleshistory_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateSampleshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateSampleshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("sampleshistory");
      toast({
        title: "Sample history being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
