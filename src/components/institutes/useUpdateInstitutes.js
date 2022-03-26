import { useMutation, useQueryClient } from "react-query";
import { institutes_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateInstitutes(data) {
  const { id, ...fields } = data;

  await fetch(institutes_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateInstitutes(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateInstitutes(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("institutes");
      toast({
        title: "Institute item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
