import { useMutation, useQueryClient } from "react-query";
import { hocwhat_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHocwhat(data) {
  await fetch(hocwhat_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHocwhat(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHocwhat(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhat");
      toast({
        title: "HOC What record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
