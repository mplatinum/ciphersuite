import { describe, it, expect } from 'vitest';
import RailFenceEncode from '../operations/RailFenceEncode';
import RailFenceDecode from '../operations/RailFenceDecode';
import { testRoundTrip, testErrors } from '../test/test-helpers';

describe('Rail Fence Cipher Encode/Decode', () => {
  describe('2 rails', () => {
    it('encodes with 2 rails', () => {
      RailFenceEncode.options = { rails: 2, offset: 0 };
      RailFenceDecode.options = { rails: 2, offset: 0 };

      // "HELLOWORLD" with 2 rails:
      // H L O O L
      // E L W R D
      // Result: "HLOOL" + "ELWRD" = "HLOOLELWRD"
      expect(RailFenceEncode.fn('HELLOWORLD')).toBe('HLOOLELWRD');
      expect(RailFenceDecode.fn('HLOOLELWRD')).toBe('HELLOWORLD');
    });

    testRoundTrip(
      { ...RailFenceEncode, options: { rails: 2, offset: 0 } },
      { ...RailFenceDecode, options: { rails: 2, offset: 0 } },
      ['HELLO', 'TESTING', 'RAILFENCE', 'CRYPTOGRAPHY']
    );
  });

  describe('3 rails', () => {
    it('encodes with 3 rails', () => {
      RailFenceEncode.options = { rails: 3, offset: 0 };
      RailFenceDecode.options = { rails: 3, offset: 0 };

      // "WEAREDISCOVEREDFLEEATONCE" with 3 rails:
      // W . . . E . . . C . . . R . . . L . . . T . . . E
      // . E . R . D . S . O . E . E . F . E . A . O . C .
      // . . A . . . I . . . V . . . D . . . E . . . N . .
      // Result: "WECRLTEERDSOEEFEAOCAIVDEN"
      expect(RailFenceEncode.fn('WEAREDISCOVEREDFLEEATONCE')).toBe(
        'WECRLTEERDSOEEFEAOCAIVDEN'
      );
    });

    testRoundTrip(
      { ...RailFenceEncode, options: { rails: 3, offset: 0 } },
      { ...RailFenceDecode, options: { rails: 3, offset: 0 } },
      ['HELLO', 'TESTING', 'RAILFENCE', 'CRYPTOGRAPHY', 'THEQUICKBROWNFOX']
    );
  });

  describe('4 rails', () => {
    it('encodes with 4 rails', () => {
      RailFenceEncode.options = { rails: 4, offset: 0 };
      RailFenceDecode.options = { rails: 4, offset: 0 };

      const plaintext = 'DEFENDTHEEASTWALLOFTHECASTLE';
      const ciphertext = RailFenceEncode.fn(plaintext);
      const decoded = RailFenceDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    testRoundTrip(
      { ...RailFenceEncode, options: { rails: 4, offset: 0 } },
      { ...RailFenceDecode, options: { rails: 4, offset: 0 } },
      ['CRYPTOGRAPHY', 'TESTMESSAGE', 'RAILFENCECIPHER']
    );
  });

  describe('With offset', () => {
    it('encodes with offset=1', () => {
      RailFenceEncode.options = { rails: 3, offset: 1 };
      RailFenceDecode.options = { rails: 3, offset: 1 };

      const plaintext = 'HELLOWORLD';
      const ciphertext = RailFenceEncode.fn(plaintext);
      const decoded = RailFenceDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    it('encodes with offset=2', () => {
      RailFenceEncode.options = { rails: 3, offset: 2 };
      RailFenceDecode.options = { rails: 3, offset: 2 };

      const plaintext = 'TESTING';
      const ciphertext = RailFenceEncode.fn(plaintext);
      const decoded = RailFenceDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    testRoundTrip(
      { ...RailFenceEncode, options: { rails: 3, offset: 1 } },
      { ...RailFenceDecode, options: { rails: 3, offset: 1 } },
      ['HELLO', 'TESTING', 'RAILFENCE']
    );
  });

  describe('Various rail counts', () => {
    [2, 3, 4, 5, 6, 7].forEach((rails) => {
      it(`round-trips with ${rails} rails`, () => {
        RailFenceEncode.options = { rails, offset: 0 };
        RailFenceDecode.options = { rails, offset: 0 };

        const inputs = ['HELLOWORLD', 'CRYPTOGRAPHY', 'TESTMESSAGE'];
        inputs.forEach((input) => {
          const encoded = RailFenceEncode.fn(input);
          const decoded = RailFenceDecode.fn(encoded);
          expect(decoded).toBe(input);
        });
      });
    });
  });

  describe('Edge cases', () => {
    it('handles various message lengths', () => {
      // Test different rail counts with appropriate message lengths
      // Rails must be < message length

      RailFenceEncode.options = { rails: 2, offset: 0 };
      RailFenceDecode.options = { rails: 2, offset: 0 };

      const inputs = ['HELLO', 'ABC', 'ABCDEF'];
      inputs.forEach((input) => {
        const encoded = RailFenceEncode.fn(input);
        const decoded = RailFenceDecode.fn(encoded);
        expect(decoded).toBe(input);
      });
    });

    it('preserves non-alphabetic characters', () => {
      RailFenceEncode.options = { rails: 2, offset: 0 };
      RailFenceDecode.options = { rails: 2, offset: 0 };

      const input = 'Hello, World!';
      const encoded = RailFenceEncode.fn(input);
      const decoded = RailFenceDecode.fn(encoded);
      expect(decoded).toBe(input);
    });

    it('handles numbers and spaces', () => {
      RailFenceEncode.options = { rails: 3, offset: 0 };
      RailFenceDecode.options = { rails: 3, offset: 0 };

      const input = 'Test 123 Message';
      const encoded = RailFenceEncode.fn(input);
      const decoded = RailFenceDecode.fn(encoded);
      expect(decoded).toBe(input);
    });
  });

  describe('Error handling', () => {
    testErrors(
      { ...RailFenceEncode, options: { rails: 1, offset: 0 } },
      [
        {
          input: 'TEST',
          errorMessage: 'Rail Fence rails should be >= 2',
          description: 'rails < 2',
        },
      ]
    );

    testErrors(
      { ...RailFenceEncode, options: { rails: 0, offset: 0 } },
      [
        {
          input: 'TEST',
          errorMessage: 'Rail Fence rails should be >= 2',
          description: 'rails = 0',
        },
      ]
    );

    testErrors(
      { ...RailFenceEncode, options: { rails: 10, offset: 0 } },
      [
        {
          input: 'TEST',
          errorMessage: 'Rail Fence rails should be less than plain text length',
          description: 'rails >= text length',
        },
      ]
    );

    testErrors(
      { ...RailFenceEncode, options: { rails: 2, offset: -1 } },
      [
        {
          input: 'TEST',
          errorMessage: 'Rail Fence offset is invalid',
          description: 'negative offset',
        },
      ]
    );

    testErrors(
      { ...RailFenceEncode, options: { rails: 2, offset: 100 } },
      [
        {
          input: 'TEST',
          errorMessage: 'Rail Fence offset is invalid',
          description: 'offset >= text length',
        },
      ]
    );
  });
});
