import { useMutation, useQueryClient } from "react-query";
import { hocwhatdetails_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateHocwhatdetails(data) {
  const { id, ...fields } = data;

  await fetch(hocwhatdetails_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateHocwhatdetails(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateHocwhatdetails(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhatdetails");
      toast({
        title: "HOC what details record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
