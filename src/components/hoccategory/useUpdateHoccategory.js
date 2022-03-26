import { useMutation, useQueryClient } from "react-query";
import { hoccategory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHoccategory(data) {
  const { id, ...fields } = data;

  await fetch(hoccategory_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHoccategory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHoccategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoccategory");
      toast({
        title: "HOC category record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
