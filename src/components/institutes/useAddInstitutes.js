import { useMutation, useQueryClient } from "react-query";
import { institutes_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addInstitutes(data) {
  await fetch(institutes_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddInstitutes(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addInstitutes(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("institutes");
      toast({
        title: "Institute item being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
