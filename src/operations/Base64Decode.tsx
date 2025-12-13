import { nanoid } from 'nanoid';
import OutputError from '../util/output-error';

export default {
  category: 'Encoding',
  name: 'Base64',
  slug: 'base64',
  id: nanoid(),
  fn(input: string) {
    try {
      return atob(input);
    } catch {
      throw new OutputError('Invalid Base64 input');
    }
  },
};
