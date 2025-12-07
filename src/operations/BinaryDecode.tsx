import { nanoid } from 'nanoid';
import OutputError from '../util/output-error';

export default {
  category: 'Encoding',
  name: 'Binary',
  slug: 'binary',
  id: nanoid(),
  fn(input: string) {
    const binaryGroups = input.trim().split(/\s+/);

    try {
      return binaryGroups
        .map((binary) => {
          if (!/^[01]+$/.test(binary)) {
            throw new Error('Invalid binary');
          }
          const charCode = parseInt(binary, 2);
          return String.fromCharCode(charCode);
        })
        .join('');
    } catch (e) {
      throw new OutputError('Invalid binary format. Expected space-separated binary values (e.g., "01001000 01101001")');
    }
  },
};
