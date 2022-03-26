import { useMutation, useQueryClient } from "react-query";
import { hocwhy_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHocwhy(data) {
  await fetch(hocwhy_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHocwhy(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHocwhy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhy");
      toast({
        title: "HOC Why record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
