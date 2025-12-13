import { nanoid } from 'nanoid';
import { BeaufortOptionsType } from '../util/store';
import BeaufortOptions from '../components/options/BeaufortOptions';
import OutputError from '../util/output-error';

export default {
  category: 'Polyalphabetic Ciphers',
  name: 'Beaufort Cipher',
  slug: 'beaufort',
  id: nanoid(),
  render: (index: number) => <BeaufortOptions index={index} />,
  options: {
    key: 'FORTIFICATION',
  } as BeaufortOptionsType,
  fn(input: string) {
    const { key } = this.options;

    if (key.length === 0) {
      throw new OutputError('Beaufort key must be set');
    }

    const upper = key.toUpperCase();
    if (!/^[A-Z]+$/.test(upper)) {
      throw new OutputError('Beaufort key must only be made of letters');
    }

    const keyChars = upper.split('').map((c) => c.charCodeAt(0) - 65);

    return input
      .split('')
      .map((c, i) => {
        const k = keyChars[i % key.length];
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          // Beaufort: key - plaintext (mod 26)
          return String.fromCharCode(((k - (code - 65) + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((k - (code - 97) + 26) % 26) + 97);
        }
        return c;
      })
      .join('');
  },
};
