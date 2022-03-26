import { useMutation, useQueryClient } from "react-query";
import { hoc_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHoc(data) {
  await fetch(hoc_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHoc(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHoc(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoc");
      toast({
        title: "HOC record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
