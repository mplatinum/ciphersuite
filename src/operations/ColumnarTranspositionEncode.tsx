import { nanoid } from 'nanoid';
import { ColumnarTranspositionOptionsType } from '../util/store';
import ColumnarTranspositionOptions from '../components/options/ColumnarTranspositionOptions';
import OutputError from '../util/output-error';

export default {
  category: 'Transposition Ciphers',
  name: 'Columnar Transposition',
  slug: 'columnar-transposition',
  id: nanoid(),
  render: (index: number) => <ColumnarTranspositionOptions index={index} />,
  options: {
    key: 'ZEBRAS',
  } as ColumnarTranspositionOptionsType,
  fn(input: string) {
    const { key } = this.options as ColumnarTranspositionOptionsType;

    if (input.length === 0) {
      return '';
    }

    if (key.length === 0) {
      throw new OutputError('Columnar transposition key must not be empty');
    }

    // Create column order from key
    const keyUpper = key.toUpperCase();
    const keyOrder = keyUpper.split('').map((char, index) => ({ char, index }));
    keyOrder.sort((a, b) => a.char.localeCompare(b.char));

    const numCols = key.length;
    const numRows = Math.ceil(input.length / numCols);

    // Fill grid row by row
    const grid: string[][] = [];
    let pos = 0;
    for (let row = 0; row < numRows; row++) {
      grid[row] = [];
      for (let col = 0; col < numCols; col++) {
        grid[row][col] = pos < input.length ? input[pos] : ' ';
        pos++;
      }
    }

    // Read columns in key order
    let result = '';
    for (const { index } of keyOrder) {
      for (let row = 0; row < numRows; row++) {
        result += grid[row][index];
      }
    }

    return result;
  },
};
