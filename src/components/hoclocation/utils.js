export function filterByEmpId(hoclocation, empId) {
  return hoclocation
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
