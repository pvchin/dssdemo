import { useMutation, useQueryClient } from "react-query";
import { yearendleavebal_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addYearendleavebal(data) {
  await fetch(yearendleavebal_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddYearendleavebal(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addYearendleavebal(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("yearendleavebal");
    //   toast({
    //     title: "Year End Leave Bal record being added!",
    //     status: "success",
    //   });
    },
  });

  return mutate;
}
