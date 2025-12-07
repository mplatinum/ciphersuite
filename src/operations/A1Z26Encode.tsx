import { nanoid } from 'nanoid';
import OutputError from '../util/output-error';

export default {
  category: 'Simple Ciphers',
  name: 'A1Z26',
  slug: 'a1z26',
  id: nanoid(),
  fn(input: string) {
    if (input.match(/[^A-Z]/ig)) {
      throw new OutputError("A1Z26 requires only alphabetical input")
    }
    return input
      .toUpperCase()
      .split('')
      .filter((c) => c >= 'A' && c <= 'Z')
      .map((v) => String(v.charCodeAt(0) - 64))
      .join(' ');
  },
};
