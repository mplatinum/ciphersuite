import { nanoid } from 'nanoid';
import { generateCharmapPolybiusSquareFrom } from '../util/charmaps';
import { PolybiusSquareOptionsType } from '../util/store';
import OutputError from '../util/output-error';
import PolybiusSquareOptions from '../components/options/PolybiusSquareOptions';

export default {
  category: 'Grid Ciphers',
  name: 'Polybius Square',
  slug: 'polybius-square',
  id: nanoid(),
  render: (index: number) => <PolybiusSquareOptions index={index} />,
  options: {
    to: false,
    spaces: false,
    square: 'ABCDEFGHIKLMNOPQRSTUVWXYZ',
    charMap: new Map(),
  } as PolybiusSquareOptionsType,
  fn(input: string) {
    const charMap = generateCharmapPolybiusSquareFrom(this.options.square);

    const { spaces } = this.options as PolybiusSquareOptionsType;

    if (spaces) {
      return input
        .split(' ')
        .map((v) => {
          if (v.length != 2) {
            throw new OutputError('Incorrect input character count');
          }
          if (v[0] < '1' || v[0] > '5' || v[1] < '1' || v[1] > '5') {
            throw new OutputError('Invalid input');
          }
          return charMap.get(v)!;
        })
        .join('');
    } else {
      const cs = input.split('');
      const v = Array(Math.floor(input.length / 2));
      for (let i = 0; i < cs.length; i += 2) {
        if (i + 1 >= cs.length) {
          throw new OutputError('Incorrect input character count');
        }
        if (cs[i] < '1' || cs[i] > '5' || cs[i + 1] < '1' || cs[i + 1] > '5') {
          throw new OutputError('Invalid input');
        }
        v[i / 2] = charMap.get(cs[i] + cs[i + 1])!;
      }
      return v.join('');
    }
  },
};
