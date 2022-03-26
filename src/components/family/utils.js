export function filterByEmpId(family, empId) {
  return family
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
