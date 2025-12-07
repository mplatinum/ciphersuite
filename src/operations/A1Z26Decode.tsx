import { nanoid } from 'nanoid';

export default {
  category: 'Simple Ciphers',
  name: 'A1Z26',
  slug: 'a1z26',
  id: nanoid(),
  fn(input: string) {
    return input
      .trim()
      .split(' ')
      .map((v) => parseInt(v, 10))
      .filter((v) => v >= 1 && v <= 26)
      .map((v) => String.fromCharCode(v + 64))
      .join('');
  },
};
