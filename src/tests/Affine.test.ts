import { describe, it, expect } from 'vitest';
import AffineEncode from '../operations/AffineEncode';
import AffineDecode from '../operations/AffineDecode';
import { testRoundTrip, testErrors } from '../test/test-helpers';

describe('Affine Cipher Encode/Decode', () => {
  describe('Default options (a=1, b=0)', () => {
    it('acts as identity cipher with a=1, b=0', () => {
      AffineEncode.options = { a: 1, b: 0 };
      AffineDecode.options = { a: 1, b: 0 };

      expect(AffineEncode.fn('HELLO')).toBe('HELLO');
      expect(AffineDecode.fn('HELLO')).toBe('HELLO');
    });
  });

  describe('Standard Affine cipher (a=5, b=8)', () => {
    it('encodes and decodes correctly', () => {
      AffineEncode.options = { a: 5, b: 8 };
      AffineDecode.options = { a: 5, b: 8 };

      const plaintext = 'HELLO';
      const ciphertext = AffineEncode.fn(plaintext);
      const decoded = AffineDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    testRoundTrip(
      { ...AffineEncode, options: { a: 5, b: 8 } },
      { ...AffineDecode, options: { a: 5, b: 8 } },
      [
        'THEQUICKBROWNFOX',
        'CRYPTOGRAPHY',
        'AFFINECIPHER',
        'TESTING',
      ]
    );
  });

  describe('Case preservation', () => {
    it('preserves case', () => {
      AffineEncode.options = { a: 5, b: 8 };
      AffineDecode.options = { a: 5, b: 8 };

      const mixed = 'HeLLo WoRLd';
      const encoded = AffineEncode.fn(mixed);
      const decoded = AffineDecode.fn(encoded);
      expect(decoded).toBe(mixed);
    });

    it('preserves non-alphabetic characters', () => {
      AffineEncode.options = { a: 5, b: 8 };

      expect(AffineEncode.fn('Hello, World!')).toContain(',');
      expect(AffineEncode.fn('Test 123')).toContain(' ');
      expect(AffineEncode.fn('Test 123')).toContain('1');
    });
  });

  describe('Different parameter combinations', () => {
    const validCombinations = [
      { a: 3, b: 5 },
      { a: 7, b: 12 },
      { a: 9, b: 3 },
      { a: 11, b: 7 },
      { a: 15, b: 20 },
      { a: 17, b: 4 },
      { a: 19, b: 15 },
      { a: 21, b: 9 },
      { a: 23, b: 18 },
      { a: 25, b: 25 },
    ];

    validCombinations.forEach(({ a, b }) => {
      it(`round-trips with a=${a}, b=${b}`, () => {
        AffineEncode.options = { a, b };
        AffineDecode.options = { a, b };

        const plaintext = 'TESTMESSAGE';
        const ciphertext = AffineEncode.fn(plaintext);
        const decoded = AffineDecode.fn(ciphertext);
        expect(decoded).toBe(plaintext);
      });
    });
  });

  describe('Error handling', () => {
    testErrors(
      { ...AffineEncode, options: { a: -1, b: 5 } },
      [
        {
          input: 'TEST',
          errorMessage: 'The values of "a" and "b" must be >= 0 in Affine Cipher',
          description: 'negative a value',
        },
      ]
    );

    testErrors(
      { ...AffineEncode, options: { a: 5, b: -1 } },
      [
        {
          input: 'TEST',
          errorMessage: 'The values of "a" and "b" must be >= 0 in Affine Cipher',
          description: 'negative b value',
        },
      ]
    );

    // Test invalid 'a' values (not coprime to 26)
    const invalidAValues = [2, 4, 6, 8, 10, 12, 13, 14, 16, 18, 20, 22, 24, 26];
    invalidAValues.forEach((a) => {
      testErrors(
        { ...AffineEncode, options: { a, b: 0 } },
        [
          {
            input: 'TEST',
            errorMessage: 'The value of "a" must be coprime to 26 in Affine Cipher',
            description: `a=${a} (not coprime to 26)`,
          },
        ]
      );
    });
  });

  describe('Mathematical properties', () => {
    it('multiplication wraps around alphabet', () => {
      AffineEncode.options = { a: 5, b: 0 };

      // Z * 5 mod 26 should wrap
      const result = AffineEncode.fn('Z');
      expect(result).toMatch(/[A-Z]/);
    });

    it('addition wraps around alphabet', () => {
      AffineEncode.options = { a: 1, b: 25 };

      // A + 25 = Z
      expect(AffineEncode.fn('A')).toBe('Z');
      // B + 25 wraps to A
      expect(AffineEncode.fn('B')).toBe('A');
    });
  });
});
