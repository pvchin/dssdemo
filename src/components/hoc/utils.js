export function filterByEmpId(hoc, empId) {
  // eslint-disable-next-line array-callback-return
  return hoc
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
