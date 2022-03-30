import { useMutation, useQueryClient } from "react-query";
import { sampleshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteSampleshistory(id) {
  await fetch(sampleshistory_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteSampleshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteSampleshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("sampleshistory");
      toast({
        title: "Sample history being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
