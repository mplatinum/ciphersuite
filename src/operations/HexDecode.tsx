import { nanoid } from 'nanoid';
import { HexOptionsType } from '../util/store';
import OutputError from '../util/output-error';
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
    let points;
    if (mode === 'ascii') {
      points = input.match(/.{1,2}/g);
    } else {
      points = input.match(/.{1,4}/g);
    }
    if (points === null) {
      throw new OutputError('Invalid input');
    }
    return points.reduce(
      (acc, char) => acc + String.fromCharCode(parseInt(char, 16)),
      ''
    );
  },
};
