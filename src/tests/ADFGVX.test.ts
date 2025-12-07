import { describe, it, expect } from 'vitest';
import ADFGVXEncode from '../operations/ADFGVXEncode';
import ADFGVXDecode from '../operations/ADFGVXDecode';
import { testRoundTrip, testErrors } from '../test/test-helpers';

describe('ADFGVX Cipher Encode/Decode', () => {
  describe('Basic encoding/decoding with default square', () => {
    it('encodes and decodes text', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'CARGO',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'CARGO',
      };

      const plaintext = 'HELLO';
      const ciphertext = ADFGVXEncode.fn(plaintext);
      const decoded = ADFGVXDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    testRoundTrip(
      { ...ADFGVXEncode, options: { ...ADFGVXEncode.options, key: 'CARGO' } },
      { ...ADFGVXDecode, options: { ...ADFGVXDecode.options, key: 'CARGO' } },
      ['HELLO', 'WORLD', 'TESTING', 'ATTACK']
    );
  });

  describe('Output format', () => {
    it('outputs only ADFGVX characters', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };

      const encoded = ADFGVXEncode.fn('HELLO');
      expect(encoded).toMatch(/^[ADFGVX]+$/);
      expect(encoded).not.toMatch(/[^ADFGVX]/);
    });

    it('produces even-length output', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'TEST',
      };

      const inputs = ['A', 'HELLO', 'WORLD', 'TESTING'];
      inputs.forEach((input) => {
        const encoded = ADFGVXEncode.fn(input);
        expect(encoded.length % 2).toBe(0);
      });
    });
  });

  describe('Case handling', () => {
    it('handles lowercase input', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };

      const lower = ADFGVXEncode.fn('hello');
      const upper = ADFGVXEncode.fn('HELLO');
      expect(lower).toBe(upper);
    });

    it('handles mixed case', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };

      const mixed = ADFGVXEncode.fn('HeLLo');
      const upper = ADFGVXEncode.fn('HELLO');
      expect(mixed).toBe(upper);
    });

    it('outputs uppercase', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'KEY',
      };

      const encoded = ADFGVXEncode.fn('test');
      const decoded = ADFGVXDecode.fn(encoded);
      expect(decoded).toBe('TEST');
    });
  });

  describe('Different keys', () => {
    const testKeys = ['KEY', 'SECRET', 'CIPHER', 'ADFGVX', 'CARGO'];

    testKeys.forEach((key) => {
      it(`round-trips with key "${key}"`, () => {
        ADFGVXEncode.options = {
          ...ADFGVXEncode.options,
          key,
        };
        ADFGVXDecode.options = {
          ...ADFGVXDecode.options,
          key,
        };

        const inputs = ['HELLO', 'WORLD', 'TEST'];
        inputs.forEach((input) => {
          const encoded = ADFGVXEncode.fn(input);
          const decoded = ADFGVXDecode.fn(encoded);
          expect(decoded).toBe(input);
        });
      });
    });
  });

  describe('Numeric input support', () => {
    it('handles numbers in input', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'KEY',
      };

      const plaintext = 'TEST123';
      const ciphertext = ADFGVXEncode.fn(plaintext);
      const decoded = ADFGVXDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    it('handles pure numeric input', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'KEY',
      };

      const plaintext = '1234567890';
      const ciphertext = ADFGVXEncode.fn(plaintext);
      const decoded = ADFGVXDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });
  });

  describe('Key properties', () => {
    it('produces different output with different keys', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'ALPHA',
      };
      const encoded1 = ADFGVXEncode.fn('HELLO');

      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'BETA',
      };
      const encoded2 = ADFGVXEncode.fn('HELLO');

      expect(encoded1).not.toBe(encoded2);
    });

    it('key determines column transposition', () => {
      // Different keys should produce different transpositions
      const plaintext = 'ATTACKATDAWN';
      const keys = ['ABC', 'CBA', 'BAC'];

      const outputs = keys.map((key) => {
        ADFGVXEncode.options = {
          ...ADFGVXEncode.options,
          key,
        };
        return ADFGVXEncode.fn(plaintext);
      });

      // All outputs should be different
      expect(outputs[0]).not.toBe(outputs[1]);
      expect(outputs[1]).not.toBe(outputs[2]);
      expect(outputs[0]).not.toBe(outputs[2]);
    });
  });

  describe('Error handling', () => {
    testErrors(
      { ...ADFGVXEncode, options: { ...ADFGVXEncode.options, key: '' } },
      [
        {
          input: 'TEST',
          errorMessage: 'Please set an ADFGVX key',
          description: 'empty key',
        },
      ]
    );

    testErrors(
      { ...ADFGVXDecode, options: { ...ADFGVXDecode.options, key: '' } },
      [
        {
          input: 'ADFGVX',
          errorMessage: 'Set an ADFGVX key',
          description: 'empty key for decode',
        },
      ]
    );

    testErrors(
      { ...ADFGVXDecode, options: { ...ADFGVXDecode.options, key: 'KEY' } },
      [
        {
          input: 'INVALID',
          errorMessage: 'Invalid ADFGVX input',
          description: 'invalid characters in ciphertext',
        },
      ]
    );

    testErrors(
      { ...ADFGVXDecode, options: { ...ADFGVXDecode.options, key: 'KEY' } },
      [
        {
          input: 'HELLO',
          errorMessage: 'Invalid ADFGVX input',
          description: 'non-ADFGVX characters',
        },
      ]
    );
  });

  describe('Edge cases', () => {
    it('handles empty string', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'KEY',
      };

      expect(ADFGVXEncode.fn('')).toBe('');
      expect(ADFGVXDecode.fn('')).toBe('');
    });

    it('handles single character', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'KEY',
      };

      const encoded = ADFGVXEncode.fn('A');
      const decoded = ADFGVXDecode.fn(encoded);
      expect(decoded).toBe('A');
    });

    it('handles very short key', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'A',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'A',
      };

      const plaintext = 'HELLO';
      const ciphertext = ADFGVXEncode.fn(plaintext);
      const decoded = ADFGVXDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });

    it('handles long key', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'VERYLONGKEYWORD',
      };
      ADFGVXDecode.options = {
        ...ADFGVXDecode.options,
        key: 'VERYLONGKEYWORD',
      };

      const plaintext = 'HELLO';
      const ciphertext = ADFGVXEncode.fn(plaintext);
      const decoded = ADFGVXDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });
  });

  describe('Long messages', () => {
    testRoundTrip(
      { ...ADFGVXEncode, options: { ...ADFGVXEncode.options, key: 'SECRET' } },
      { ...ADFGVXDecode, options: { ...ADFGVXDecode.options, key: 'SECRET' } },
      [
        'THEQUICKBROWNFOX',
        'DEFENDTHEEASTWALLOFTHECASTLE',
        'ATTACKATDAWN',
        'CRYPTOGRAPHY',
        'TEST123MESSAGE456',
      ]
    );
  });

  describe('Cipher strength', () => {
    it('changes plaintext significantly', () => {
      ADFGVXEncode.options = {
        ...ADFGVXEncode.options,
        key: 'KEY',
      };

      const plaintext = 'HELLO';
      const ciphertext = ADFGVXEncode.fn(plaintext);

      // Ciphertext should be different from plaintext
      expect(ciphertext).not.toBe(plaintext);

      // Ciphertext should be longer (coordinates + transposition)
      expect(ciphertext.length).toBeGreaterThan(plaintext.length);
    });
  });
});
