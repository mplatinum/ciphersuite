import { nanoid } from 'nanoid';
import { ROT13OptionsType } from '../util/store';
import ROT13Options from '../components/options/ROT13Options';

export default {
  category: 'Simple Ciphers',
  name: 'ROT13',
  slug: 'rot13',
  id: nanoid(),
  render: (index: number) => <ROT13Options index={index} />,
  options: {
    offset: 13,
    keepNonAlphanumeric: true,
    rotateNumbers: true,
  } as ROT13OptionsType,
  fn(input: string) {
    const { offset, keepNonAlphanumeric, rotateNumbers } = this.options;

    let inputClean = input.split('');
    if (!keepNonAlphanumeric) {
      inputClean = inputClean.filter(
        (c) =>
          (c >= 'a' && c <= 'z') ||
          (c >= 'A' && c <= 'Z') ||
          (c >= '0' && c <= '9')
      );
    }
    const letterAmount = offset >= 0 ? offset : 26 - (Math.abs(offset) % 26);
    const numberAmount = offset >= 0 ? offset : 10 - (Math.abs(offset) % 10);

    return inputClean
      .map((c) => {
        const code = c.charCodeAt(0);
        if (c >= 'A' && c <= 'Z') {
          return String.fromCharCode(((code - 65 + letterAmount) % 26) + 65);
        } else if (c >= 'a' && c <= 'z') {
          return String.fromCharCode(((code - 97 + letterAmount) % 26) + 97);
        } else if (rotateNumbers && c >= '0' && c <= '9') {
          return String.fromCharCode(((code - 48 + numberAmount) % 10) + 48);
        }
        return c;
      })
      .join('');
  },
};
