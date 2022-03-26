export function filterByEmpId(hocwhat, empId) {
  return hocwhat
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
