import { describe, it, expect } from 'vitest';
import BifidEncode from '../operations/BifidEncode';
import BifidDecode from '../operations/BifidDecode';
import { testRoundTrip } from '../test/test-helpers';

describe('Bifid Cipher Encode/Decode', () => {
  describe('Basic encoding/decoding', () => {
    it('encodes and decodes text', () => {
      const plaintext = 'HELLO';
      const ciphertext = BifidEncode.fn(plaintext);
      const decoded = BifidDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    testRoundTrip(BifidEncode, BifidDecode, [
      'HELLO',
      'WORLD',
      'TESTING',
      'CRYPTOGRAPHY',
      'BIFID',
    ]);
  });

  describe('Letter handling', () => {
    it('treats J as I', () => {
      const withJ = BifidEncode.fn('JACK');
      const withI = BifidEncode.fn('IACK');
      expect(withI).toBe(withJ);
    });

    it('decodes to I (not J)', () => {
      const encoded = BifidEncode.fn('JUMP');
      const decoded = BifidDecode.fn(encoded);
      expect(decoded).toBe('IUMP');
    });
  });

  describe('Case handling', () => {
    it('handles lowercase input', () => {
      const lower = BifidEncode.fn('hello');
      const upper = BifidEncode.fn('HELLO');
      expect(lower).toBe(upper);
    });

    it('handles mixed case', () => {
      const mixed = BifidEncode.fn('HeLLo');
      const upper = BifidEncode.fn('HELLO');
      expect(mixed).toBe(upper);
    });

    it('outputs uppercase', () => {
      const encoded = BifidEncode.fn('test');
      const decoded = BifidDecode.fn(encoded);
      expect(decoded).toBe('TEST');
      expect(decoded).not.toContain('t');
    });
  });

  describe('Cipher properties', () => {
    it('changes plaintext significantly', () => {
      const plaintext = 'HELLO';
      const ciphertext = BifidEncode.fn(plaintext);
      expect(ciphertext).not.toBe(plaintext);
      expect(ciphertext.length).toBe(plaintext.length);
    });

    it('preserves length', () => {
      const inputs = ['A', 'AB', 'ABC', 'HELLO', 'CRYPTOGRAPHY'];
      inputs.forEach((input) => {
        const encoded = BifidEncode.fn(input);
        expect(encoded.length).toBe(input.length);
      });
    });

    it('produces different output for different inputs', () => {
      const encoded1 = BifidEncode.fn('HELLO');
      const encoded2 = BifidEncode.fn('WORLD');
      expect(encoded1).not.toBe(encoded2);
    });
  });

  describe('Round-trip with various lengths', () => {
    testRoundTrip(BifidEncode, BifidDecode, [
      'HI',
      'TEST',
      'HELLOWORLD',
      'CRYPTOGRAPHY',
      'A',
      'HEY',
      'HELLO',
      'TESTMESSAGE',
    ]);
  });

  describe('Full alphabet coverage', () => {
    it('handles all letters (except J)', () => {
      const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      const encoded = BifidEncode.fn(alphabet);
      const decoded = BifidDecode.fn(encoded);
      expect(decoded).toBe(alphabet);
    });

    testRoundTrip(BifidEncode, BifidDecode, [
      'ABCDEFGHIKLMNOPQRSTUVWXYZ',
      'ZYXWVUTSRQPONMLKIHGFEDCBA',
    ]);
  });

  describe('Edge cases', () => {
    it('handles empty string', () => {
      expect(() => BifidEncode.fn('')).not.toThrow();
      expect(() => BifidDecode.fn('')).not.toThrow();
    });

    it('handles single character', () => {
      const encoded = BifidEncode.fn('A');
      const decoded = BifidDecode.fn(encoded);
      expect(decoded).toBe('A');
    });

    it('handles repeated characters', () => {
      const encoded = BifidEncode.fn('AAAA');
      const decoded = BifidDecode.fn(encoded);
      expect(decoded).toBe('AAAA');
    });

    it('handles palindromes', () => {
      const palindromes = ['ABA', 'ABBA', 'RACECAR'];
      palindromes.forEach((input) => {
        const encoded = BifidEncode.fn(input);
        const decoded = BifidDecode.fn(encoded);
        expect(decoded).toBe(input);
      });
    });
  });

  describe('Comparison with Polybius Square', () => {
    it('differs from simple Polybius Square', () => {
      // Bifid should produce different output than just Polybius coordinates
      const input = 'HELLO';
      const bifidEncoded = BifidEncode.fn(input);
      // Bifid output should be letters, not numbers
      expect(bifidEncoded).toMatch(/^[A-Z]+$/);
      expect(bifidEncoded).not.toMatch(/\d/);
    });
  });

  describe('Long messages', () => {
    testRoundTrip(BifidEncode, BifidDecode, [
      'THEQUICKBROWNFOXIUMPSOVERTHELAZYDOG',
      'DEFENDTHEEASTWALLOFTHECASTLE',
      'ATTACKATDAWN',
    ]);
  });
});
