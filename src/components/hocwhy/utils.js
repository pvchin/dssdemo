export function filterByEmpId(hocwhy, empId) {
  return hocwhy
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
