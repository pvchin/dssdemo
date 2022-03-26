import { useMutation, useQueryClient } from "react-query";
import { hocwhydetails_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHocwhydetails(id) {
  await fetch(hocwhydetails_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHocwhydetails(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHocwhydetails(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhydetails");
      toast({
        title: "HOC Why details record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
