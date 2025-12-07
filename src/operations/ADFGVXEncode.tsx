import { nanoid } from 'nanoid';
import { generateCharmapADFGVXTo } from '../util/charmaps';
import { ADFGVXOptionsType } from '../util/store';
import OutputError from '../util/output-error';
import ADFGVXOptions from '../components/options/ADFGVXOptions';

export default {
  category: 'Grid Ciphers',
  name: 'ADFGVX Cipher',
  slug: 'adfgvx',
  id: nanoid(),
  render: (index: number) => <ADFGVXOptions index={index} />,
  options: {
    to: true,
    key: 'ADFGVX',
    square: 'NA1C3H8TB2OME5WRPD4F6G7I9J0KLQSUVXYZ',
  } as ADFGVXOptionsType,
  fn(input: string) {
    const charMap = generateCharmapADFGVXTo(this.options.square);

    const { key: optKey } = this.options as ADFGVXOptionsType;

    if (optKey.length === 0) {
      throw new OutputError('Please set an ADFGVX key');
    }

    const upper = input.toUpperCase();
    const encoded = upper
      .split('')
      .map((v) => charMap.get(v)!)
      .join('');

    const nCols = optKey.length;
    const nRows = Math.ceil(encoded.length / nCols);

    const cols = Array(nCols);
    for (let x = 0; x < nCols; x++) {
      cols[x] = {
        k: optKey[x],
        v: Array(nRows),
      };
      for (let y = 0; y < nRows; y++) {
        const k = y * nCols + x;
        if (k < encoded.length) {
          cols[x].v[y] = encoded[k];
        }
      }
    }

    cols.sort((a, b) => (a.k > b.k ? 1 : -1));

    const outChars: string[] = [];
    for (let x = 0; x < nCols; x++) {
      for (let y = 0; y < nRows; y++) {
        if (cols[x].v[y]) {
          outChars.push(cols[x].v[y]);
        }
      }
    }
    return outChars.join('');
  },
};
