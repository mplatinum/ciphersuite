import { describe, it, expect } from 'vitest';
import VigenereEncode from '../operations/VigenereEncode';
import VigenereDecode from '../operations/VigenereDecode';
import { testRoundTrip, testErrors } from '../test/test-helpers';

describe('Vigenère Cipher Encode/Decode', () => {
  describe('Basic encoding/decoding', () => {
    it('encodes and decodes with key "KEY"', () => {
      VigenereEncode.options = { key: 'KEY' };
      VigenereDecode.options = { key: 'KEY' };

      const plaintext = 'ATTACKATDAWN';
      const ciphertext = VigenereEncode.fn(plaintext);
      const decoded = VigenereDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    it('encodes and decodes with key "LEMON"', () => {
      VigenereEncode.options = { key: 'LEMON' };
      VigenereDecode.options = { key: 'LEMON' };

      const plaintext = 'ATTACKATDAWN';
      const ciphertext = VigenereEncode.fn(plaintext);
      const decoded = VigenereDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    it('handles single character key (becomes Caesar cipher)', () => {
      VigenereEncode.options = { key: 'C' };
      VigenereDecode.options = { key: 'C' };

      expect(VigenereEncode.fn('ABC')).toBe('CDE');
      expect(VigenereDecode.fn('CDE')).toBe('ABC');
    });
  });

  describe('Case handling', () => {
    it('preserves case in plaintext', () => {
      VigenereEncode.options = { key: 'KEY' };
      VigenereDecode.options = { key: 'KEY' };

      const mixed = 'AttackAtDawn';
      const encoded = VigenereEncode.fn(mixed);
      const decoded = VigenereDecode.fn(encoded);
      expect(decoded).toBe(mixed);
    });

    it('handles lowercase key same as uppercase', () => {
      VigenereEncode.options = { key: 'key' };
      const lower = VigenereEncode.fn('ATTACK');

      VigenereEncode.options = { key: 'KEY' };
      const upper = VigenereEncode.fn('ATTACK');

      expect(lower).toBe(upper);
    });

    it('preserves non-alphabetic characters', () => {
      VigenereEncode.options = { key: 'KEY' };

      const input = 'Hello, World!';
      const encoded = VigenereEncode.fn(input);
      expect(encoded).toContain(',');
      expect(encoded).toContain(' ');
      expect(encoded).toContain('!');
    });
  });

  describe('Key repetition', () => {
    it('repeats key for longer messages', () => {
      VigenereEncode.options = { key: 'AB' };
      VigenereDecode.options = { key: 'AB' };

      // With key "AB", pattern should repeat: A B A B A B
      const plaintext = 'AAAAAA';
      const ciphertext = VigenereEncode.fn(plaintext);
      expect(ciphertext).toBe('ABABAB');
    });

    it('advances key with every character position', () => {
      VigenereEncode.options = { key: 'ABC' };
      VigenereDecode.options = { key: 'ABC' };

      // Key advances with position: pos 0->A, pos 1->space, pos 2->A, pos 3->space, pos 4->A, pos 5->space, pos 6->A
      // A(i=0, k=A), space, A(i=2, k=C), space, A(i=4, k=B), space, A(i=6, k=A)
      const input = 'A A A A';
      const output = VigenereEncode.fn(input);
      expect(output).toBe('A C B A');
    });
  });

  describe('Round-trip tests', () => {
    const testKeys = ['KEY', 'VIGENERE', 'SECRET', 'A', 'XYZ'];

    testKeys.forEach((key) => {
      testRoundTrip(
        { ...VigenereEncode, options: { key } },
        { ...VigenereDecode, options: { key } },
        [
          'THEQUICKBROWNFOX',
          'CRYPTOGRAPHY',
          'TESTMESSAGE',
          'Hello World',
          'MixedCase123Text',
        ]
      );
    });
  });

  describe('Error handling', () => {
    testErrors(
      { ...VigenereEncode, options: { key: '' } },
      [
        {
          input: 'TEST',
          errorMessage: 'Vigenère key must be set',
          description: 'empty key',
        },
      ]
    );

    testErrors(
      { ...VigenereEncode, options: { key: 'KEY123' } },
      [
        {
          input: 'TEST',
          errorMessage: 'Vigenère key must only be made of letters',
          description: 'key with numbers',
        },
      ]
    );

    testErrors(
      { ...VigenereEncode, options: { key: 'KEY!' } },
      [
        {
          input: 'TEST',
          errorMessage: 'Vigenère key must only be made of letters',
          description: 'key with special characters',
        },
      ]
    );

    testErrors(
      { ...VigenereEncode, options: { key: 'KEY SPACE' } },
      [
        {
          input: 'TEST',
          errorMessage: 'Vigenère key must only be made of letters',
          description: 'key with spaces',
        },
      ]
    );
  });

  describe('Edge cases', () => {
    it('handles empty string', () => {
      VigenereEncode.options = { key: 'KEY' };
      VigenereDecode.options = { key: 'KEY' };

      expect(VigenereEncode.fn('')).toBe('');
      expect(VigenereDecode.fn('')).toBe('');
    });

    it('handles string with only non-alphabetic characters', () => {
      VigenereEncode.options = { key: 'KEY' };
      VigenereDecode.options = { key: 'KEY' };

      const input = '123 !@# $%^';
      expect(VigenereEncode.fn(input)).toBe(input);
      expect(VigenereDecode.fn(input)).toBe(input);
    });

    it('wraps around alphabet correctly', () => {
      VigenereEncode.options = { key: 'Z' };
      VigenereDecode.options = { key: 'Z' };

      expect(VigenereEncode.fn('A')).toBe('Z');
      expect(VigenereEncode.fn('B')).toBe('A');
      expect(VigenereDecode.fn('Z')).toBe('A');
      expect(VigenereDecode.fn('A')).toBe('B');
    });
  });
});
