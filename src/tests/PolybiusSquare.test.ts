import { describe, it, expect, beforeEach } from 'vitest';
import PolybiusSquareEncode from '../operations/PolybiusSquareEncode';
import PolybiusSquareDecode from '../operations/PolybiusSquareDecode';
import { testRoundTrip } from '../test/test-helpers';

describe('Polybius Square Encode/Decode', () => {
  beforeEach(() => {
    // Ensure charMaps are properly initialized
    const square = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    PolybiusSquareEncode.options = {
      to: true,
      spaces: false,
      square,
    };
    PolybiusSquareDecode.options = {
      to: false,
      spaces: false,
      square,
    };
  });

  describe('Default square', () => {
    it('encodes letters to coordinate pairs', () => {
      const input = 'HELLO';
      const encoded = PolybiusSquareEncode.fn(input);
      const decoded = PolybiusSquareDecode.fn(encoded);
      expect(decoded).toBe(input);
    });

    testRoundTrip(PolybiusSquareEncode, PolybiusSquareDecode, [
      'HELLO',
      'WORLD',
      'TESTING',
      'CRYPTOGRAPHY',
    ]);
  });

  describe('Letter handling', () => {
    it('handles I and J as same character', () => {
      const withI = PolybiusSquareEncode.fn('HILLO');
      const withJ = PolybiusSquareEncode.fn('HJLLO');
      // I and J should encode the same way
      expect(withI[0]).toBe(withJ[0]); // H
      expect(withI.substring(2, 4)).toBe(withJ.substring(2, 4)); // I/J position
    });

    it('decodes to I (not J)', () => {
      const encoded = PolybiusSquareEncode.fn('JACK');
      const decoded = PolybiusSquareDecode.fn(encoded);
      // J should decode as I
      expect(decoded).toBe('IACK');
    });
  });

  describe('Case handling', () => {
    it('handles lowercase input', () => {
      const lower = PolybiusSquareEncode.fn('hello');
      const upper = PolybiusSquareEncode.fn('HELLO');
      expect(lower).toBe(upper);
    });

    it('handles mixed case', () => {
      const mixed = PolybiusSquareEncode.fn('HeLLo');
      const upper = PolybiusSquareEncode.fn('HELLO');
      expect(mixed).toBe(upper);
    });

    it('decodes to uppercase', () => {
      const encoded = PolybiusSquareEncode.fn('test');
      const decoded = PolybiusSquareDecode.fn(encoded);
      expect(decoded).toBe('TEST');
    });
  });

  describe('Custom square', () => {
    it('round-trips with custom square', () => {
      const customSquare = 'XYZABCDEFGHIKLMNOPQRSTUVW';
      PolybiusSquareEncode.options = {
        to: true,
        spaces: false,
        square: customSquare,
      };
      PolybiusSquareDecode.options = {
        to: false,
        spaces: false,
        square: customSquare,
      };

      const inputs = ['HELLO', 'WORLD'];
      inputs.forEach((input) => {
        const encoded = PolybiusSquareEncode.fn(input);
        const decoded = PolybiusSquareDecode.fn(encoded);
        expect(decoded).toBe(input);
      });
    });
  });

  describe('Output format', () => {
    it('outputs digit pairs', () => {
      const encoded = PolybiusSquareEncode.fn('A');
      expect(encoded).toMatch(/^\d{2}$/); // Two digits
    });

    it('outputs multiple digit pairs', () => {
      const encoded = PolybiusSquareEncode.fn('ABC');
      expect(encoded).toMatch(/^\d{6}$/); // Six digits (3 letters × 2 digits)
    });

    it('uses valid coordinates (1-5)', () => {
      const encoded = PolybiusSquareEncode.fn('ABCDEFGHIKLMNOPQRSTUVWXYZ');
      const digits = encoded.split('');
      digits.forEach((digit) => {
        const num = parseInt(digit);
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('Edge cases', () => {
    it('handles empty string', () => {
      expect(PolybiusSquareEncode.fn('')).toBe('');
      expect(PolybiusSquareDecode.fn('')).toBe('');
    });

    it('handles single character', () => {
      const encoded = PolybiusSquareEncode.fn('A');
      const decoded = PolybiusSquareDecode.fn(encoded);
      expect(decoded).toBe('A');
    });

    it('handles full alphabet (except J)', () => {
      const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      const encoded = PolybiusSquareEncode.fn(alphabet);
      const decoded = PolybiusSquareDecode.fn(encoded);
      expect(decoded).toBe(alphabet);
    });
  });

  describe('Round-trip with various inputs', () => {
    testRoundTrip(PolybiusSquareEncode, PolybiusSquareDecode, [
      'THEQUICKBROWNFOX',
      'CRYPTOGRAPHY',
      'POLYBIUSSQUARE',
      'TESTMESSAGE',
      'A',
      'AB',
      'ABCDEFGHIKLMNOPQRSTUVWXYZ',
    ]);
  });
});
