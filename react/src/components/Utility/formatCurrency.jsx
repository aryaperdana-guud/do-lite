export const formatCurrency = (amount) => {
  if (!amount) return "Rp 0,-";
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};
