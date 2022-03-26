import { useMutation, useQueryClient } from "react-query";
import { hocwhatdetails_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addHocwhatdetails(data) {
  await fetch(hocwhatdetails_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddHocwhatdetails(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addHocwhatdetails(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhatdetails");
      toast({
        title: "HOC What details record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
