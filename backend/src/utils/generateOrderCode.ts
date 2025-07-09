export function generateOrderCode(): string {
  const letters = String.fromCharCode(
    65 + Math.floor(Math.random() * 26),
    65 + Math.floor(Math.random() * 26),
  );
  const digits = Math.floor(100 + Math.random() * 900);
  return `ORD-${letters}${digits}`;
}
