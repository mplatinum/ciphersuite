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
    const { key } = this.options;

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

    // Create empty grid
    const grid: string[][] = [];
    for (let i = 0; i < numRows; i++) {
      const row: string[] = [];
      for (let j = 0; j < numCols; j++) {
        row.push('');
      }
      grid.push(row);
    }

    // Fill columns in key order
    let pos = 0;
    for (const { index } of keyOrder) {
      for (let row = 0; row < numRows; row++) {
        if (pos < input.length) {
          grid[row][index] = input[pos];
          pos++;
        }
      }
    }

    // Read row by row
    let result = '';
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        result += grid[row][col];
      }
    }

    return result.trimEnd();
  },
};
