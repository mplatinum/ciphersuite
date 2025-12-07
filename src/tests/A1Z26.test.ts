import { describe, it, expect } from 'vitest';
import A1Z26Encode from '../operations/A1Z26Encode';
import A1Z26Decode from '../operations/A1Z26Decode';
import { testCipherPair, testRoundTrip, testErrors } from '../test/test-helpers';

describe('A1Z26 Encode/Decode', () => {
  testCipherPair(A1Z26Encode, A1Z26Decode, [
    { plaintext: 'A', ciphertext: '1' },
    { plaintext: 'Z', ciphertext: '26' },
    { plaintext: 'ABC', ciphertext: '1 2 3' },
    { plaintext: 'HELLO', ciphertext: '8 5 12 12 15' },
    { plaintext: 'TEST', ciphertext: '20 5 19 20' },
    { plaintext: '', ciphertext: '' },
  ]);

  testRoundTrip(A1Z26Encode, A1Z26Decode, [
    'THEQUICKBROWNFOX',
    'ALPHABET',
    'CRYPTOGRAPHY',
    'TESTING',
  ]);

  describe('Case handling', () => {
    it('converts lowercase to uppercase before encoding', () => {
      expect(A1Z26Encode.fn('abc')).toBe('1 2 3');
      expect(A1Z26Encode.fn('hello')).toBe('8 5 12 12 15');
    });

    it('handles mixed case', () => {
      expect(A1Z26Encode.fn('HeLLo')).toBe('8 5 12 12 15');
    });
  });

  describe('A1Z26 Encode Error Handling', () => {
    testErrors(A1Z26Encode, [
      {
        input: 'ABC123',
        errorMessage: 'A1Z26 requires only alphabetical input',
        description: 'numbers in input',
      },
      {
        input: 'Hello World',
        errorMessage: 'A1Z26 requires only alphabetical input',
        description: 'spaces in input',
      },
      {
        input: 'Test!',
        errorMessage: 'A1Z26 requires only alphabetical input',
        description: 'special characters in input',
      },
    ]);
  });

  describe('A1Z26 Decode', () => {
    it('handles single digit numbers', () => {
      expect(A1Z26Decode.fn('1')).toBe('A');
      expect(A1Z26Decode.fn('9')).toBe('I');
    });

    it('handles double digit numbers', () => {
      expect(A1Z26Decode.fn('10')).toBe('J');
      expect(A1Z26Decode.fn('26')).toBe('Z');
    });

    it('handles mixed single and double digits', () => {
      expect(A1Z26Decode.fn('1 10 26')).toBe('AJZ');
    });

    it('handles space-separated numbers', () => {
      expect(A1Z26Decode.fn('1 2 3')).toBe('ABC');
    });
  });
});
