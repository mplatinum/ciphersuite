import { nanoid } from 'nanoid';
import { HexOptionsType } from '../util/store';
import HexOptions from '../components/options/HexOptions';

export default {
  category: 'Encoding',
  name: 'Hex',
  slug: 'hex',
  id: nanoid(),
  render: (index: number) => <HexOptions index={index} />,
  options: 'ascii' as HexOptionsType,
  fn(input: string) {
    const mode = this.options as HexOptionsType;
    const padLength = mode === 'unicode' ? 4 : 2;
    return Array.from(input, (c) =>
      c.charCodeAt(0).toString(16).padStart(padLength, '0')
    ).join('');
  },
};
