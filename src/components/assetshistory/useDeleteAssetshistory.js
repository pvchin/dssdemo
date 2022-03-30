import { useMutation, useQueryClient } from "react-query";
import { assetshistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteAssetshistory(id) {
  await fetch(assetshistory_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteAssetshistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteAssetshistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("assetshistory");
      toast({
        title: "Asset history being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
