import { useMutation, useQueryClient } from "react-query";
import { hocwhydetails_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHocwhydetails(data) {
  const { id, ...fields } = data;

  await fetch(hocwhydetails_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHocwhydetails(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHocwhydetails(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhydetails");
      toast({
        title: "HOC why details record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
