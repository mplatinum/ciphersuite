import { nanoid } from 'nanoid';
import {
  generateCharmapPolybiusSquareFrom,
  generateCharmapPolybiusSquareTo,
} from '../util/charmaps';
import { BifidOptionsType } from '../util/store';
import BifidOptions from '../components/options/BifidOptions';

export default {
  category: 'Grid Ciphers',
  name: 'Bifid Cipher',
  slug: 'bifid',
  id: nanoid(),
  render: (index: number) => <BifidOptions index={index} />,
  options: {
    square: 'BGWKZQPNDSIOAXEFCLUMTHYVR',
  } as BifidOptionsType,
  fn(input: string) {
    const charMap1 = generateCharmapPolybiusSquareTo(this.options.square);
    const charMap2 = generateCharmapPolybiusSquareFrom(this.options.square);

    const s1 = input
      .toUpperCase()
      .split('')
      .map((c) => charMap1.get(c)!)
      .join('');

    const half = s1.length / 2;
    const arr = Array(half);
    for (let i = 0; i < half; i++) {
      arr[i] = charMap2.get(s1[i] + s1[i + half]);
    }

    return arr.join('');
  },
};
