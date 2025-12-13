import { nanoid } from 'nanoid';
import OutputError from '../util/output-error';

export default {
  category: 'Encoding',
  name: 'Base64',
  slug: 'base64',
  id: nanoid(),
  fn(input: string) {
    try {
      return btoa(input);
    } catch {
      throw new OutputError('Invalid input for Base64 encoding (only Latin1 characters supported)');
    }
  },
};
