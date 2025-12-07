import { nanoid } from 'nanoid';
import AffineOptions from '../components/options/AffineOptions';
import { AffineOptionsType } from '../util/store';
import { gcd, mod, modInv } from '../util/math';
import OutputError from '../util/output-error';

export default {
  category: 'Mathematical Ciphers',
  name: 'Affine Cipher',
  slug: 'affine',
  id: nanoid(),
  render: (index: number) => <AffineOptions index={index} />,
  options: {
    a: 1,
    b: 0,
  },
  fn(input: string) {
    const { a, b } = this.options as AffineOptionsType;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const aModInv = modInv(a, 26);

    if (a < 0 || b < 0) {
      throw new OutputError(
        'The values of "a" and "b" must be >= 0 in Affine Cipher'
      );
    }

    if (gcd(a, 26) !== 1) {
      throw new OutputError(
        'The value of "a" must be coprime to 26 in Affine Cipher'
      );
    }

    return Array.from(input, (c) => {
      if (c >= 'a' && c <= 'z') {
        return alphabet[mod((c.charCodeAt(0) - 97 - b) * aModInv, 26)];
      } else if (c >= 'A' && c <= 'Z') {
        return alphabet[mod((c.charCodeAt(0) - 65 - b) * aModInv, 26)].toUpperCase();
      } else {
        return c;
      }
    }).join('');
  },
};
