import { describe, it, expect } from 'vitest';
import SubstitutionEncode from '../operations/SubstitutionEncode';
import SubstitutionDecode from '../operations/SubstitutionDecode';
import { testRoundTrip, testErrors } from '../test/test-helpers';

describe('Substitution Cipher Encode/Decode', () => {
  describe('Basic substitution', () => {
    it('encodes with default mapping', () => {
      SubstitutionEncode.options = {
        from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        to: 'XYZABCDEFGHIJKLMNOPQRSTUVW',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('ABC')).toBe('XYZ');
      expect(SubstitutionEncode.fn('XYZ')).toBe('UVW');
    });

    it('decodes with inverse mapping', () => {
      SubstitutionDecode.options = {
        from: 'XYZABCDEFGHIJKLMNOPQRSTUVW',
        to: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ignoreCase: true,
      };

      expect(SubstitutionDecode.fn('XYZ')).toBe('ABC');
    });

    it('round-trips with complementary encode/decode', () => {
      SubstitutionEncode.options = {
        from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        to: 'XYZABCDEFGHIJKLMNOPQRSTUVW',
        ignoreCase: true,
      };
      SubstitutionDecode.options = {
        from: 'XYZABCDEFGHIJKLMNOPQRSTUVW',
        to: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ignoreCase: true,
      };

      const plaintext = 'HELLO';
      const ciphertext = SubstitutionEncode.fn(plaintext);
      const decoded = SubstitutionDecode.fn(ciphertext);
      expect(decoded).toBe(plaintext);
    });
  });

  describe('Case handling', () => {
    it('handles mixed case with ignoreCase=true', () => {
      SubstitutionEncode.options = {
        from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        to: 'ZYXWVUTSRQPONMLKJIHGFEDCBA',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('Hello')).toBe('Svool');
      expect(SubstitutionEncode.fn('HELLO')).toBe('SVOOL');
      expect(SubstitutionEncode.fn('hello')).toBe('svool');
    });

    it('preserves case in output', () => {
      SubstitutionEncode.options = {
        from: 'ABC',
        to: 'XYZ',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('AbC')).toBe('XyZ');
      expect(SubstitutionEncode.fn('abc')).toBe('xyz');
      expect(SubstitutionEncode.fn('ABC')).toBe('XYZ');
    });

    it('handles ignoreCase=false', () => {
      SubstitutionEncode.options = {
        from: 'ABC',
        to: 'XYZ',
        ignoreCase: false,
      };

      expect(SubstitutionEncode.fn('ABC')).toBe('XYZ');
      expect(SubstitutionEncode.fn('abc')).toBe('abc'); // No match, unchanged
    });
  });

  describe('Partial alphabet substitution', () => {
    it('only substitutes specified characters', () => {
      SubstitutionEncode.options = {
        from: 'AEIOU',
        to: '43105',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('HELLO')).toBe('H3LL0');
      expect(SubstitutionEncode.fn('WORLD')).toBe('W0RLD');
    });

    it('leaves unspecified characters unchanged', () => {
      SubstitutionEncode.options = {
        from: 'ABC',
        to: 'XYZ',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('ABCDEF')).toBe('XYZDEF');
    });
  });

  describe('Special mappings', () => {
    const atbashMapping = {
      from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      to: 'ZYXWVUTSRQPONMLKJIHGFEDCBA',
      ignoreCase: true,
    };

    testRoundTrip(
      { ...SubstitutionEncode, options: atbashMapping },
      { ...SubstitutionDecode, options: atbashMapping },
      ['HELLO', 'ATBASH', 'TESTING']
    );

    it('is self-inverse with Atbash', () => {
      SubstitutionEncode.options = {
        from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        to: 'ZYXWVUTSRQPONMLKJIHGFEDCBA',
        ignoreCase: true,
      };

      const inputs = ['HELLO', 'WORLD', 'TEST'];
      inputs.forEach((input) => {
        const once = SubstitutionEncode.fn(input);
        const twice = SubstitutionEncode.fn(once);
        expect(twice).toBe(input);
      });
    });
  });

  describe('Non-alphabetic characters', () => {
    it('preserves spaces', () => {
      SubstitutionEncode.options = {
        from: 'ABC',
        to: 'XYZ',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('A B C')).toBe('X Y Z');
    });

    it('preserves punctuation', () => {
      SubstitutionEncode.options = {
        from: 'HELLO',
        to: 'URYYB',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('Hello, World!')).toContain(',');
      expect(SubstitutionEncode.fn('Hello, World!')).toContain('!');
    });

    it('preserves numbers', () => {
      SubstitutionEncode.options = {
        from: 'ABC',
        to: 'XYZ',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('A1B2C3')).toBe('X1Y2Z3');
    });
  });

  describe('Error handling', () => {
    testErrors(
      {
        ...SubstitutionEncode,
        options: { from: 'ABC', to: 'XY', ignoreCase: true },
      },
      [
        {
          input: 'TEST',
          errorMessage: 'From and to values should be same length in substitution cipher',
          description: 'mismatched from/to lengths',
        },
      ]
    );

    testErrors(
      {
        ...SubstitutionEncode,
        options: { from: 'ABCD', to: 'XYZ', ignoreCase: true },
      },
      [
        {
          input: 'TEST',
          errorMessage: 'From and to values should be same length in substitution cipher',
          description: 'from longer than to',
        },
      ]
    );
  });

  describe('Round-trip with various mappings', () => {
    const testMappings = [
      {
        from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        to: 'XYZABCDEFGHIJKLMNOPQRSTUVW',
        description: 'ROT3-like',
      },
      {
        from: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        to: 'QWERTYUIOPASDFGHJKLZXCVBNM',
        description: 'QWERTY keyboard',
      },
      {
        from: 'AEIOU',
        to: '12345',
        description: 'vowels to numbers',
      },
    ];

    testMappings.forEach(({ from, to, description }) => {
      it(`round-trips with ${description}`, () => {
        SubstitutionEncode.options = { from, to, ignoreCase: true };
        // For decode, swap from and to
        SubstitutionDecode.options = { from: to, to: from, ignoreCase: true };

        const inputs = ['HELLO', 'WORLD', 'TEST'];
        inputs.forEach((input) => {
          const encoded = SubstitutionEncode.fn(input);
          const decoded = SubstitutionDecode.fn(encoded);
          expect(decoded).toBe(input);
        });
      });
    });
  });

  describe('Edge cases', () => {
    it('handles empty string', () => {
      SubstitutionEncode.options = {
        from: 'ABC',
        to: 'XYZ',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('')).toBe('');
    });

    it('handles string with no matching characters', () => {
      SubstitutionEncode.options = {
        from: 'ABC',
        to: 'XYZ',
        ignoreCase: true,
      };

      expect(SubstitutionEncode.fn('DEF')).toBe('DEF');
      expect(SubstitutionEncode.fn('123')).toBe('123');
    });

    it('handles duplicate characters in from/to (uses last occurrence)', () => {
      SubstitutionEncode.options = {
        from: 'ABCA',
        to: 'XYZW',
        ignoreCase: true,
      };

      // Last A->W mapping should be used (Map overwrites previous entries)
      expect(SubstitutionEncode.fn('A')).toBe('W');
    });
  });
});
