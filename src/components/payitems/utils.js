export function filterByType(payitems, type) {
  // eslint-disable-next-line array-callback-return
  return payitems
    .filter((item) => item.pay_type === type)
    .map((r) => {
      return { ...r };
    });
}
