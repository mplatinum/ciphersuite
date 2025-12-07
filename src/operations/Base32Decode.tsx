import { nanoid } from 'nanoid';
import Base32Options from '../components/options/Base32Options';
import { Base32OptionsType } from '../util/store';
import base32Decode from 'base32-decode';
import OutputError from '../util/output-error';

export default {
  category: 'Encoding',
  name: 'Base32',
  slug: 'base32',
  id: nanoid(),
  render: (index: number) => <Base32Options index={index} />,
  options: 'RFC4648' as Base32OptionsType,
  fn(input: string) {
    try {
      const decoder = new TextDecoder();
      return decoder.decode(
        base32Decode(input, this.options! as Base32OptionsType)
      );
    } catch (e) {
      throw new OutputError('Invalid Base32 input');
    }
  },
};
