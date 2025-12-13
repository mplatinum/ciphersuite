import { nanoid } from 'nanoid';
import { VigenereOptionsType } from '../util/store';
import VigenereOptions from '../components/options/VigenereOptions';
import OutputError from '../util/output-error';

export default {
  category: 'Polyalphabetic Ciphers',
  name: 'Vigenère Cipher',
  slug: 'vigenere',
  id: nanoid(),
  render: (index: number) => <VigenereOptions index={index} />,
  options: {
    key: '',
  } as VigenereOptionsType,
  fn(input: string) {
    const { key } = this.options;

    if (key.length === 0) {
      throw new OutputError('Vigenère key must be set');
    }

    const upper = key.toUpperCase();
    if (!/^[A-Z]+$/.test(upper)) {
      throw new OutputError('Vigenère key must only be made of letters');
    }

    const keyChars = upper.split('').map((c) => c.charCodeAt(0) - 65);

    return input
      .split('')
      .map((c, i) => {
        const k = keyChars[i % key.length];
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + 26 - k) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + 26 - k) % 26) + 97);
        }
        return c;
      })
      .join('');
  },
};
