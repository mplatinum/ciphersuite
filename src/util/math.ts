export function modInv(x: number, y: number) {
  x %= y;
  for (let i = 1; i < y; i++) {
    if ((x * i) % y === 1) {
      return i;
    }
  }
  return NaN;
}

export function gcd(x: number, y: number) {
  if (!y) {
    return x;
  }
  return gcd(y, x % y);
}

export function mod(x: number, y: number) {
  return ((x % y) + y) % y;
}
