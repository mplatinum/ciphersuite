import { nanoid } from 'nanoid';
import { generateCharmapPolybiusSquareTo } from '../util/charmaps';
import { PolybiusSquareOptionsType } from '../util/store';
import PolybiusSquareOptions from '../components/options/PolybiusSquareOptions';
import OutputError from '../util/output-error';

export default {
  category: 'Grid Ciphers',
  name: 'Polybius Square',
  slug: 'polybius-square',
  id: nanoid(),
  render: (index: number) => <PolybiusSquareOptions index={index} />,
  options: {
    to: true,
    spaces: false,
    square: 'ABCDEFGHIKLMNOPQRSTUVWXYZ',
  } as PolybiusSquareOptionsType,
  fn(input: string) {
    const charMap = generateCharmapPolybiusSquareTo(this.options.square);

    const { spaces } = this.options;
    if (input.match(/[^A-Z]/ig)) {
      throw new OutputError("Polybius square requires only alphabetical input")
    }
    return input
      .toUpperCase()
      .split('')
      .map((c) => charMap.get(c === 'J' ? 'I' : c)!)
      .join(spaces ? ' ' : '');
  },
};
