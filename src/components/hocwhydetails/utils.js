export function filterByEmpId(hocwhydetails, empId) {
  return hocwhydetails
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
