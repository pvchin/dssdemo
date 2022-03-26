export function filterByEmpId(hoclookup, empId) {
   return hoclookup
     .filter((item) => item.empid === empId)
     .map((r) => {
       return { ...r };
     });
}
