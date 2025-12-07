import { nanoid } from 'nanoid';
import { PlayfairOptionsType } from '../util/store';
import PlayfairOptions from '../components/options/PlayfairOptions';
import OutputError from '../util/output-error';

function generatePlayfairGrid(key: string): string[][] {
  const keyUpper = key.toUpperCase().replace(/J/g, 'I');
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

  const seen = new Set<string>();
  const gridChars: string[] = [];

  // Add key characters first
  for (const char of keyUpper) {
    if (alphabet.includes(char) && !seen.has(char)) {
      seen.add(char);
      gridChars.push(char);
    }
  }

  // Add remaining alphabet
  for (const char of alphabet) {
    if (!seen.has(char)) {
      gridChars.push(char);
    }
  }

  // Create 5x5 grid
  const grid: string[][] = [];
  for (let i = 0; i < 5; i++) {
    grid.push(gridChars.slice(i * 5, (i + 1) * 5));
  }

  return grid;
}

function findPosition(grid: string[][], char: string): [number, number] {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (grid[row][col] === char) {
        return [row, col];
      }
    }
  }
  return [0, 0];
}

export default {
  category: 'Grid Ciphers',
  name: 'Playfair Cipher',
  slug: 'playfair',
  id: nanoid(),
  render: (index: number) => <PlayfairOptions index={index} />,
  options: {
    key: 'PLAYFAIR',
  } as PlayfairOptionsType,
  fn(input: string) {
    const { key } = this.options as PlayfairOptionsType;
    const grid = generatePlayfairGrid(key);

    const cleaned = input.toUpperCase().replace(/[^A-Z]/g, '');

    if (cleaned.length === 0) {
      throw new OutputError('Playfair cipher requires alphabetic input');
    }

    if (cleaned.length % 2 !== 0) {
      throw new OutputError('Playfair cipher input must have even length');
    }

    // Decode each digraph
    let result = '';
    for (let i = 0; i < cleaned.length; i += 2) {
      const [row1, col1] = findPosition(grid, cleaned[i]);
      const [row2, col2] = findPosition(grid, cleaned[i + 1]);

      if (row1 === row2) {
        // Same row: shift left
        result += grid[row1][(col1 + 4) % 5] + grid[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
        // Same column: shift up
        result += grid[(row1 + 4) % 5][col1] + grid[(row2 + 4) % 5][col2];
      } else {
        // Rectangle: swap columns
        result += grid[row1][col2] + grid[row2][col1];
      }
    }

    return result;
  },
};
