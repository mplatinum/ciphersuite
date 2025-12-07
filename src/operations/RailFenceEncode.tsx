import { nanoid } from 'nanoid';
import { RailFenceOptionsType } from '../util/store';
import OutputError from '../util/output-error';
import RailFenceOptions from '../components/options/RailFenceOptions';

export default {
  category: 'Transposition Ciphers',
  name: 'Rail Fence Cipher',
  slug: 'railfence',
  id: nanoid(),
  render: (index: number) => <RailFenceOptions index={index} />,
  options: {
    rails: 2,
    offset: 0,
  } as RailFenceOptionsType,
  fn(input: string) {
    const { rails, offset } = this.options as RailFenceOptionsType;

    if (rails < 2) {
      throw new OutputError('Rail Fence rails should be >= 2');
    }

    if (rails >= input.length) {
      throw new OutputError(
        'Rail Fence rails should be less than plain text length'
      );
    }

    if (offset < 0 || offset >= input.length) {
      throw new OutputError('Rail Fence offset is invalid');
    }

    const rows = Array(rails);
    for (let i = 0; i < rows.length; i++) {
      rows[i] = [];
    }

    let i = 0,
      dir = true;
    for (let j = 0; j < input.length + offset; j++) {
      if (j >= offset) {
        rows[i].push(input[j - offset]);
      }
      if ((dir && i === rails - 1) || (!dir && i === 0)) {
        dir = !dir;
      }
      if (dir) {
        i++;
      } else {
        i--;
      }
    }
    return rows.reduce((acc, cur) => acc + cur.join(''), '');
  },
};
