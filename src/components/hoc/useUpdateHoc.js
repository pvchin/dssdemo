import { useMutation, useQueryClient } from "react-query";
import { hoc_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHoc(data) {
  const { id, ...fields } = data;

  await fetch(hoc_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHoc(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHoc(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoc");
      toast({
        title: "Hoc record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
