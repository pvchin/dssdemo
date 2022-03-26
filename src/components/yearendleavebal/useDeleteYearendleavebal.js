import { useMutation, useQueryClient } from "react-query";
import { yearendleavebal_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteYearendleavebal(id) {
  await fetch(yearendleavebal_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteYearendleavebal(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteYearendleavebal(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("yearendleavebal");
    //   toast({
    //     title: "Year End Leave Bal record being deleted!",
    //     status: "warning",
    //   });
    },
  });

  return mutate;
}
