import { describe } from 'vitest';
import BinaryEncode from '../operations/BinaryEncode';
import BinaryDecode from '../operations/BinaryDecode';
import { testCipherPair, testRoundTrip, testErrors } from '../test/test-helpers';

describe('Binary Encode/Decode', () => {
  testCipherPair(BinaryEncode, BinaryDecode, [
    { plaintext: 'Hi', ciphertext: '01001000 01101001' },
    { plaintext: 'A', ciphertext: '01000001' },
    { plaintext: 'ABC', ciphertext: '01000001 01000010 01000011' },
    { plaintext: 'a', ciphertext: '01100001' },
    { plaintext: '123', ciphertext: '00110001 00110010 00110011' },
    { plaintext: ' ', ciphertext: '00100000' },
  ]);

  testRoundTrip(BinaryEncode, BinaryDecode, [
    'Hello World',
    'The quick brown fox',
    'UPPERCASE',
    'lowercase',
    'Numbers123',
    'Special!@#',
  ]);

  describe('Binary Decode Error Handling', () => {
    testErrors(BinaryDecode, [
      { input: 'invalid', description: 'non-binary input' },
      { input: '012', description: 'invalid binary digit' },
      { input: 'abc def', description: 'alphabetic characters' },
    ]);
  });
});
