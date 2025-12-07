import { describe } from 'vitest';
import ColumnarTranspositionEncode from '../operations/ColumnarTranspositionEncode';
import ColumnarTranspositionDecode from '../operations/ColumnarTranspositionDecode';
import { testCipherPair, testRoundTrip } from '../test/test-helpers';

describe('Columnar Transposition Encode/Decode', () => {
  testCipherPair(ColumnarTranspositionEncode, ColumnarTranspositionDecode, [
  ]);

  testRoundTrip(ColumnarTranspositionEncode, ColumnarTranspositionDecode, [
    'ATTACK AT DAWN',
    'MEET ME AT NOON',
    'THE QUICK BROWN FOX',
    'HELLO WORLD',
  ]);
});
