import base32Encode from 'base32-encode';
import { Base32OptionsType } from '../util/store';
import { nanoid } from 'nanoid';
import Base32Options from '../components/options/Base32Options';

export default {
  category: 'Encoding',
  name: 'Base32',
  slug: 'base32',
  id: nanoid(),
  render: (index: number) => <Base32Options index={index} />,
  options: 'RFC4648' as Base32OptionsType,
  fn(input: string) {
    const encoder = new TextEncoder();
    return base32Encode(
      encoder.encode(input),
      this.options
    );
  },
};
