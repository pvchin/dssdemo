export function filterByEmpId(hocwhatdetails, empId) {
  return hocwhatdetails
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
