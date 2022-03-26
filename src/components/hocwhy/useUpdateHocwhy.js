import { useMutation, useQueryClient } from "react-query";
import { hocwhy_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHocwhy(data) {
  const { id, ...fields } = data;

  await fetch(hocwhy_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHocwhy(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHocwhy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhy");
      toast({
        title: "HOC why record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
