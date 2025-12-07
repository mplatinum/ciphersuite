import { nanoid } from 'nanoid';
import { generateCharmapADFGVXFrom } from '../util/charmaps';
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
    to: false,
    key: '',
    square: 'NA1C3H8TB2OME5WRPD4F6G7I9J0KLQSUVXYZ',
    charMap: new Map(),
  } as ADFGVXOptionsType,
  fn(input: string) {
    const charMap = generateCharmapADFGVXFrom(this.options.square);

    const { key: optKey } = this.options as ADFGVXOptionsType;

    if (input === '') {
      return '';
    }

    if (optKey.length === 0) {
      throw new OutputError('Set an ADFGVX key');
    }

    const upper = input.toUpperCase();

    if (/[^ADFGVX]/.test(upper)) {
      throw new OutputError('Invalid ADFGVX input');
    }

    const key = optKey
      .toUpperCase()
      .split('')
      .map((c, i) => ({ c, i }))
      .sort((a, b) => (a.c > b.c ? 1 : -1));

    const cols = Array(key.length);

    const bColLen = Math.floor(upper.length / key.length);
    const nLongCols = upper.length % key.length;

    let upto = 0;
    for (let i = 0; i < key.length; i++) {
      let colLen = bColLen;
      if (key[i].i < nLongCols) {
        colLen++;
      }
      cols[key[i].i] = upper.substring(upto, upto + colLen);
      upto += colLen;
    }

    const encodedChars: string[] = [];
    for (let j = 0; j < bColLen + 1; j++) {
      for (let i = 0; i < key.length; i++) {
        if (cols[i][j] !== undefined) {
          encodedChars.push(cols[i][j]);
        }
      }
    }
    const encoded = encodedChars.join('');

    // ADFGVX encoding produces pairs of characters, so we need an even length
    if (encoded.length % 2 !== 0) {
      throw new OutputError('Invalid ADFGVX encoded text - uneven character count');
    }

    const matches = encoded.match(/[ADFGVX]{2}/g);
    if (matches === null || matches.length === 0) {
      throw new OutputError('ADFGVX decoding error - no valid character pairs found');
    }

    const decoded = matches.map((v) => charMap.get(v)).join('');

    if (decoded === '' || decoded.includes('undefined')) {
      throw new OutputError('ADFGVX decoding resulted in empty output - check your key and polybius square');
    }

    return decoded;
  },
};
