import { useMutation, useQueryClient } from "react-query";
import { assets_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateAsset(data) {
  const { id, ...fields } = data;

  await fetch(assets_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateAsset(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateAsset(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("assets");
      toast({
        title: "Asset being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
