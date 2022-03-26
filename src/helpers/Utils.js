export function formatPrice(cents) {
  if (!cents) return null;
  
  return cents.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
export function formatPriceZero(cents) {
  //if (!cents) return null;
  
  return cents.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
