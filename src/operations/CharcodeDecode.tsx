import { nanoid } from 'nanoid';

export default {
  category: 'Encoding',
  name: 'Charcode',
  slug: 'charcode',
  id: nanoid(),
  fn(input: string) {
    return input
      .trim()
      .split(' ')
      .map((v) => String.fromCharCode(parseInt(v, 10)))
      .join('');
  },
};
