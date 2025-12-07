export function generateCharmapPolybiusSquareTo(square: string) {
  const v = new Map<string, string>();

  out: for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const k = y * 5 + x;
      if (k >= square.length) {
        break out;
      }
      v.set(square[k], String(y + 1) + String(x + 1));
    }
  }

  return v;
}

export function generateCharmapPolybiusSquareFrom(square: string) {
  const v = new Map<string, string>();

  out: for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const k = y * 5 + x;
      if (k >= square.length) {
        break out;
      }
      v.set(String(y + 1) + String(x + 1), square[k]);
    }
  }

  return v;
}

export function generateCharmapADFGVXTo(square: string) {
  const v = new Map<string, string>();
  const alphabet = 'ADFGVX';

  out: for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      const i = y * 6 + x;
      if (i >= square.length) {
        break out;
      }
      const yc = alphabet[y];
      const xc = alphabet[x];
      v.set(square[i], yc + xc);
    }
  }

  return v;
}

export function generateCharmapADFGVXFrom(square: string) {
  const v = new Map<string, string>();
  const alphabet = 'ADFGVX';

  out: for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      const i = y * 6 + x;
      if (i >= square.length) {
        break out;
      }
      const yc = alphabet[y];
      const xc = alphabet[x];
      v.set(yc + xc, square[i]);
    }
  }

  return v;
}
