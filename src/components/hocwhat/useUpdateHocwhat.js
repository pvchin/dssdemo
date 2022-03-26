import { useMutation, useQueryClient } from "react-query";
import { hocwhat_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHocwhat(data) {
  const { id, ...fields } = data;

  await fetch(hocwhat_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHocwhat(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHocwhat(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhat");
      toast({
        title: "HOC what record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
