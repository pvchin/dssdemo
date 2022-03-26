export function filterByEmpId(expenses, empId) {
  // eslint-disable-next-line array-callback-return
  return expenses
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}

export function filterByPayrun(expenses, payrun) {
  // eslint-disable-next-line array-callback-return
  return expenses
    .filter((item) => item.payrun === payrun)
    .map((r) => {
      return { ...r };
    });
}

export function filterByStatus(expenses, status) {
  // eslint-disable-next-line array-callback-return
  return expenses
    .filter((item) => item.status === status)
    .map((r) => {
      return { ...r };
    });
}
