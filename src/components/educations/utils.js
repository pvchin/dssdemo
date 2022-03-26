export function filterByEmpId(educations, empId) {
  return educations
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
