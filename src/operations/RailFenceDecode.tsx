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
    const { rails, offset } = this.options;

    if (rails < 2) {
      throw new OutputError('Rail Fence rails should be >= 2');
    }

    if (rails >= input.length) {
      throw new OutputError(
        'Rail Fence rails should be less than cipher text length'
      );
    }

    if (offset < 0 || offset >= input.length) {
      throw new OutputError('Rail Fence offset is invalid');
    }

    const cycle = (rails - 1) * 2;
    const plaintext = Array(input.length);

    // taken from cyberchef
    let j = 0;
    for (let y = 0; y < rails; y++) {
      for (let x = 0; x < input.length; x++) {
        if ((y + x + offset) % cycle === 0 || (y - x - offset) % cycle === 0) {
          plaintext[x] = input[j++];
        }
      }
    }

    return plaintext.join('');
  },
};
