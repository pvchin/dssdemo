import { useMutation, useQueryClient } from "react-query";
import { sampleshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addSampleshistory(data) {
  await fetch(sampleshistory_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddSampleshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addSampleshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("sampleshistory");
      toast({
        title: "Sample history being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
