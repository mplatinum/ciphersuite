import { nanoid } from 'nanoid';

export default {
  category: 'Encoding',
  name: 'Binary',
  slug: 'binary',
  id: nanoid(),
  fn(input: string) {
    return input
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  },
};
