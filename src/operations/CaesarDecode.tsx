import { nanoid } from 'nanoid';
import { CaesarOptionsType } from '../util/store';
import CaesarOptions from '../components/options/CaesarOptions';

export default {
  category: 'Simple Ciphers',
  name: 'Caesar Cipher',
  slug: 'caesar',
  id: nanoid(),
  render: (index: number) => <CaesarOptions index={index} />,
  options: {
    shift: 3,
  } as CaesarOptionsType,
  fn(input: string) {
    const { shift } = this.options;
    return input
      .split('')
      .map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        }
        return c;
      })
      .join('');
  },
};
