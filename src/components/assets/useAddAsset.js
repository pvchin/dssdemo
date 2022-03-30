import { useMutation, useQueryClient } from "react-query";
import { assets_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addAsset(data) {
  await fetch(assets_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddAsset(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addAsset(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("assets");
      toast({
        title: "Asset being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
