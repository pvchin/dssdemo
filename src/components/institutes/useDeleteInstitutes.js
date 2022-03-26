import { useMutation, useQueryClient } from "react-query";
import { institutes_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteInstitutes(id) {
  await fetch(institutes_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteInstitutes(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteInstitutes(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("institutes");
      toast({
        title: "Institute item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
