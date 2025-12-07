import { describe, it, expect } from 'vitest';
import Base64Encode from '../operations/Base64Encode';
import Base64Decode from '../operations/Base64Decode';
import { testCipherPair, testRoundTrip, testErrors } from '../test/test-helpers';

describe('Base64 Encode/Decode', () => {
  testCipherPair(Base64Encode, Base64Decode, [
    { plaintext: 'Hello World', ciphertext: 'SGVsbG8gV29ybGQ=' },
    { plaintext: 'The quick brown fox', ciphertext: 'VGhlIHF1aWNrIGJyb3duIGZveA==' },
    { plaintext: 'a', ciphertext: 'YQ==' },
    { plaintext: 'ab', ciphertext: 'YWI=' },
    { plaintext: 'abc', ciphertext: 'YWJj' },
    { plaintext: '', ciphertext: '' },
    { plaintext: '123456', ciphertext: 'MTIzNDU2' },
    { plaintext: 'Special!@#$%^&*()', ciphertext: 'U3BlY2lhbCFAIyQlXiYqKCk=' },
  ]);

  testRoundTrip(Base64Encode, Base64Decode, [
    'Lorem ipsum dolor sit amet',
    'UPPERCASE TEXT',
    'lowercase text',
    'MixedCase123Text',
    'Line1\nLine2\nLine3',
    'Tab\tSeparated\tValues',
  ]);

  describe('Base64 Encode Error Handling', () => {
    testErrors(Base64Encode, [
      {
        input: 'Test\u{1F600}', // Emoji outside Latin1
        description: 'non-Latin1 character (emoji)',
      },
    ]);

    // Test that Latin-1 extended characters work
    it('handles Latin-1 extended characters', () => {
      const input = 'café';
      const encoded = Base64Encode.fn(input);
      expect(() => Base64Decode.fn(encoded)).not.toThrow();
    });
  });

  describe('Base64 Decode Error Handling', () => {
    testErrors(Base64Decode, [
      { input: 'Invalid!', description: 'invalid Base64 characters' },
      { input: 'Not@Base64#', description: 'invalid characters with symbols' },
    ]);

    it('handles valid Base64 padding variations', () => {
      expect(Base64Decode.fn('YQ==')).toBe('a');
      expect(Base64Decode.fn('YWI=')).toBe('ab');
      expect(Base64Decode.fn('YWJj')).toBe('abc');
    });
  });
});
