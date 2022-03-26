import { useMutation, useQueryClient } from "react-query";
import { hocwhydetails_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHocwhydetails(data) {
  await fetch(hocwhydetails_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHocwhydetails(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHocwhydetails(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhydetails");
      toast({
        title: "HOC Why details record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
