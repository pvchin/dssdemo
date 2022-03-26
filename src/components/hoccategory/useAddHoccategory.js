import { useMutation, useQueryClient } from "react-query";
import { hoccategory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHoccategory(data) {
  await fetch(hoccategory_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHoccategory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHoccategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoccategory");
      toast({
        title: "HOC Category record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
