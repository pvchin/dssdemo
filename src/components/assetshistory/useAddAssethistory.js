import { useMutation, useQueryClient } from "react-query";
import { assetshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addAssetshistory(data) {
  await fetch(assetshistory_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddAssetshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addAssetshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("assetshistory");
      toast({
        title: "Asset history being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
