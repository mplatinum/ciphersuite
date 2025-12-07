import { describe, it, expect } from 'vitest';
import AtbashEncode from '../operations/AtbashEncode';
import AtbashDecode from '../operations/AtbashDecode';
import { testCipherPair, testRoundTrip } from '../test/test-helpers';

describe('Atbash Encode/Decode', () => {
  testCipherPair(AtbashEncode, AtbashDecode, [
    { plaintext: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', ciphertext: 'ZYXWVUTSRQPONMLKJIHGFEDCBA' },
    { plaintext: 'abcdefghijklmnopqrstuvwxyz', ciphertext: 'zyxwvutsrqponmlkjihgfedcba' },
    { plaintext: 'HELLO', ciphertext: 'SVOOL' },
    { plaintext: 'hello', ciphertext: 'svool' },
    { plaintext: 'The Quick Brown Fox', ciphertext: 'Gsv Jfrxp Yildm Ulc' },
    { plaintext: 'ABC', ciphertext: 'ZYX' },
    { plaintext: 'XYZ', ciphertext: 'CBA' },
    { plaintext: '', ciphertext: '' },
  ]);

  testRoundTrip(AtbashEncode, AtbashDecode, [
    'The quick brown fox jumps over the lazy dog',
    'UPPERCASE TEXT',
    'lowercase text',
    'MixedCase123Text',
  ]);

  describe('Atbash properties', () => {
    it('is self-inverse (encoding twice returns original)', () => {
      const inputs = ['Hello', 'TEST', 'AbCdEf', 'The Quick Brown Fox'];
      inputs.forEach((input) => {
        const once = AtbashEncode.fn(input);
        const twice = AtbashEncode.fn(once);
        expect(twice).toBe(input);
      });
    });

    it('preserves case', () => {
      expect(AtbashEncode.fn('A')).toBe('Z');
      expect(AtbashEncode.fn('a')).toBe('z');
      expect(AtbashEncode.fn('HeLLo')).toBe('SvOOl');
    });

    it('preserves non-alphabetic characters', () => {
      expect(AtbashEncode.fn('Hello, World!')).toBe('Svool, Dliow!');
      expect(AtbashEncode.fn('Test 123')).toBe('Gvhg 123');
      expect(AtbashEncode.fn('a@b#c$')).toBe('z@y#x$');
    });

    it('maps first letter to last letter', () => {
      expect(AtbashEncode.fn('A')).toBe('Z');
      expect(AtbashEncode.fn('B')).toBe('Y');
      expect(AtbashEncode.fn('Z')).toBe('A');
    });
  });
});
