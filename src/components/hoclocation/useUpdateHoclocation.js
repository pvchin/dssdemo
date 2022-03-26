import { useMutation, useQueryClient } from "react-query";
import { hoclocation_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHoclocation(data) {
  const { id, ...fields } = data;

  await fetch(hoclocation_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHoclocation(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHoclocation(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoclocation");
      toast({
        title: "HOC location record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
