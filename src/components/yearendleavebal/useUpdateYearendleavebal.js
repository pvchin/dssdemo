import { useMutation, useQueryClient } from "react-query";
import { yearendleavebal_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateYearendleavebal(data) {
  const { id, ...fields } = data;

  await fetch(yearendleavebal_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateYearendleavebal(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateYearendleavebal(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("yearendleavebal");
      // toast({
      //   title: "Leave record being updated!",
      //   status: "success",
      // });
    },
  });

  return mutate;
}
