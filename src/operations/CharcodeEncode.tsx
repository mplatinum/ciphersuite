import { nanoid } from 'nanoid';

export default {
  category: 'Encoding',
  name: 'Charcode',
  slug: 'charcode',
  id: nanoid(),
  fn(input: string) {
    return input
      .split('')
      .map((v) => String(v.charCodeAt(0)))
      .join(' ');
  },
};
