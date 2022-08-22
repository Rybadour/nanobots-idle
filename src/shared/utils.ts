export function formatNumber(n: number, minimumFractionDigits: number, maximumFractionDigits: number): string {
  if (isNaN(n)) return '';

  return n.toLocaleString(undefined, {minimumFractionDigits, maximumFractionDigits});
}

export function getExponentialValue(base: number, growth: number, growthCount: number) {
  return base * Math.pow(growth, growthCount);
}