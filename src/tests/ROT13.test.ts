import { describe, it, expect, beforeEach } from 'vitest';
import ROT13Encode from '../operations/ROT13Encode';
import ROT13Decode from '../operations/ROT13Decode';
import { testCipherPair, testRoundTrip } from '../test/test-helpers';

describe('ROT13 Encode/Decode', () => {
  beforeEach(() => {
    // Reset to default ROT13 (offset 13)
    ROT13Encode.options = { offset: 13, keepNonAlphanumeric: true, rotateNumbers: true };
    ROT13Decode.options = { offset: 13, keepNonAlphanumeric: true, rotateNumbers: true };
  });

  testCipherPair(ROT13Encode, ROT13Decode, [
    { plaintext: 'HELLO', ciphertext: 'URYYB' },
    { plaintext: 'hello', ciphertext: 'uryyb' },
    { plaintext: 'The Quick Brown Fox', ciphertext: 'Gur Dhvpx Oebja Sbk' },
    { plaintext: 'ABC', ciphertext: 'NOP' },
    { plaintext: 'XYZ', ciphertext: 'KLM' },
    { plaintext: 'NOPnop', ciphertext: 'ABCabc' },
    { plaintext: '', ciphertext: '' },
  ]);

  testRoundTrip(ROT13Encode, ROT13Decode, [
    'The quick brown fox jumps over the lazy dog',
    'UPPERCASE TEXT',
    'lowercase text',
    'MixedCase123Text',
  ]);

  describe('ROT13 properties', () => {
    it('is self-inverse (encoding twice returns original)', () => {
      const inputs = ['Hello', 'TEST', 'AbCdEf'];
      inputs.forEach((input) => {
        const once = ROT13Encode.fn(input);
        const twice = ROT13Encode.fn(once);
        expect(twice).toBe(input);
      });
    });

    it('preserves case', () => {
      expect(ROT13Encode.fn('A')).toBe('N');
      expect(ROT13Encode.fn('a')).toBe('n');
      expect(ROT13Encode.fn('HeLLo')).toBe('UrYYb');
    });

    it('preserves non-alphabetic characters', () => {
      // Temporarily set rotateNumbers to false for this test
      ROT13Encode.options = { offset: 13, keepNonAlphanumeric: true, rotateNumbers: false };

      expect(ROT13Encode.fn('Hello, World!')).toBe('Uryyb, Jbeyq!');
      expect(ROT13Encode.fn('Test 123')).toBe('Grfg 123');
      expect(ROT13Encode.fn('a@b#c$')).toBe('n@o#p$');
    });

    it('handles all alphabet positions', () => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const rotated = 'NOPQRSTUVWXYZABCDEFGHIJKLM';
      expect(ROT13Encode.fn(alphabet)).toBe(rotated);
    });
  });

  describe('ROT13 offset options', () => {
    it('supports custom offset (ROT5)', () => {
      ROT13Encode.options = { offset: 5, keepNonAlphanumeric: true, rotateNumbers: true };
      ROT13Decode.options = { offset: 5, keepNonAlphanumeric: true, rotateNumbers: true };

      expect(ROT13Encode.fn('ABCDE')).toBe('FGHIJ');
      expect(ROT13Decode.fn('FGHIJ')).toBe('ABCDE');
    });

    it('supports custom offset (ROT1/Caesar)', () => {
      ROT13Encode.options = { offset: 1, keepNonAlphanumeric: true, rotateNumbers: true };
      ROT13Decode.options = { offset: 1, keepNonAlphanumeric: true, rotateNumbers: true };

      expect(ROT13Encode.fn('ABC')).toBe('BCD');
      expect(ROT13Decode.fn('BCD')).toBe('ABC');
    });

    it('wraps around alphabet with custom offset', () => {
      ROT13Encode.options = { offset: 3, keepNonAlphanumeric: true, rotateNumbers: true };
      ROT13Decode.options = { offset: 3, keepNonAlphanumeric: true, rotateNumbers: true };

      expect(ROT13Encode.fn('XYZ')).toBe('ABC');
      expect(ROT13Decode.fn('ABC')).toBe('XYZ');
    });
  });
});
