import { useMutation, useQueryClient } from "react-query";
import { hoclocation_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHoclocation(data) {
  await fetch(hoclocation_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHoclocation(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHoclocation(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hoclocation");
      toast({
        title: "HOC Location record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
