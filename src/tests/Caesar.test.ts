import { describe, it, expect } from 'vitest';
import CaesarEncode from '../operations/CaesarEncode';
import CaesarDecode from '../operations/CaesarDecode';
import { testCipherPair, testRoundTrip } from '../test/test-helpers';

describe('Caesar Encode/Decode', () => {
  testCipherPair(CaesarEncode, CaesarDecode, [
    { plaintext: 'HELLO', ciphertext: 'KHOOR' },
    { plaintext: 'hello', ciphertext: 'khoor' },
    { plaintext: 'The Quick Brown Fox', ciphertext: 'Wkh Txlfn Eurzq Ira' },
    { plaintext: 'ABC', ciphertext: 'DEF' },
    { plaintext: 'XYZ', ciphertext: 'ABC' },
    { plaintext: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', ciphertext: 'DEFGHIJKLMNOPQRSTUVWXYZABC' },
    { plaintext: '', ciphertext: '' },
  ]);

  testRoundTrip(CaesarEncode, CaesarDecode, [
    'The quick brown fox jumps over the lazy dog',
    'UPPERCASE TEXT',
    'lowercase text',
    'MixedCase123Text',
  ]);

  describe('Caesar properties', () => {
    it('shifts by 3 positions', () => {
      expect(CaesarEncode.fn('A')).toBe('D');
      expect(CaesarEncode.fn('B')).toBe('E');
      expect(CaesarEncode.fn('C')).toBe('F');
    });

    it('preserves case', () => {
      expect(CaesarEncode.fn('A')).toBe('D');
      expect(CaesarEncode.fn('a')).toBe('d');
      expect(CaesarEncode.fn('HeLLo')).toBe('KhOOr');
    });

    it('preserves non-alphabetic characters', () => {
      expect(CaesarEncode.fn('Hello, World!')).toBe('Khoor, Zruog!');
      expect(CaesarEncode.fn('Test 123')).toBe('Whvw 123');
      expect(CaesarEncode.fn('a@b#c$')).toBe('d@e#f$');
    });

    it('wraps around alphabet', () => {
      expect(CaesarEncode.fn('XYZ')).toBe('ABC');
      expect(CaesarEncode.fn('xyz')).toBe('abc');
    });
  });
});
