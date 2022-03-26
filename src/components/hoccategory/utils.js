export function filterByEmpId(hoccategory, empId) {
  return hoccategory
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
