import { nanoid } from 'nanoid';
import AffineOptions from '../components/options/AffineOptions';
import OutputError from '../util/output-error';
import { gcd } from '../util/math';

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
    const { a, b } = this.options;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    if (a < 0 || b < 0) {
      throw new OutputError('The values of "a" and "b" must be >= 0 in Affine Cipher');
    }

    if (gcd(a, 26) !== 1) {
      throw new OutputError(
        'The value of "a" must be coprime to 26 in Affine Cipher'
      );
    }

    return Array.from(input, (c) => {
      if (c >= 'a' && c <= 'z') {
        return alphabet[(a * (c.charCodeAt(0) - 97) + b) % 26];
      } else if (c >= 'A' && c <= 'Z') {
        return alphabet[(a * (c.charCodeAt(0) - 65) + b) % 26].toUpperCase();
      } else {
        return c;
      }
    }).join('');
  },
};
