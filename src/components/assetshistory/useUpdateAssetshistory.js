import { useMutation, useQueryClient } from "react-query";
import { assetshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateAssetshistory(data) {
  const { id, ...fields } = data;

  await fetch(assetshistory_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateAssetshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateAssetshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("assetshistory");
      toast({
        title: "Asset history being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
