import { useMutation, useQueryClient } from "react-query";
import { assets_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteAsset(id) {
  await fetch(assets_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteAsset(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteAsset(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("assets");
      toast({
        title: "Asset being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
