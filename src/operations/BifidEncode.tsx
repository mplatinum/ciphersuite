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
      .map((c) => charMap1.get(c === 'J' ? 'I' : c)!)
      .join('');

    const half = s1.length / 2;
    const arr = Array(s1.length);
    for (let i = 0; i < s1.length; i += 2) {
      const k = i / 2;
      arr[k] = s1[i];
      arr[half + k] = s1[i + 1];
    }

    const out = Array(half);
    for (let i = 0; i < arr.length; i += 2) {
      const c = charMap2.get(arr[i] + arr[i + 1])!;
      out[i / 2] = c;
    }

    return out.join('');
  },
};
