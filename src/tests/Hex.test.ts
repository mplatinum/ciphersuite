import { describe, it, expect } from 'vitest';
import HexEncode from '../operations/HexEncode';
import HexDecode from '../operations/HexDecode';
import { testCipherPair, testRoundTrip } from '../test/test-helpers';

describe('Hex Encode/Decode', () => {
  describe('ASCII mode (default)', () => {
    testCipherPair(HexEncode, HexDecode, [
      { plaintext: 'Hello', ciphertext: '48656c6c6f' },
      { plaintext: 'ABC', ciphertext: '414243' },
      { plaintext: '123', ciphertext: '313233' },
      { plaintext: 'a', ciphertext: '61' },
      { plaintext: ' ', ciphertext: '20' },
      { plaintext: 'Test!', ciphertext: '5465737421' },
    ]);

    it('handles empty string encoding', () => {
      expect(HexEncode.fn('')).toBe('');
    });

    testRoundTrip(HexEncode, HexDecode, [
      'The quick brown fox',
      'Special chars: !@#$%^&*()',
      'Numbers: 0123456789',
      'Mixed Case Text',
    ]);
  });

  describe('Unicode mode', () => {
    it('encodes unicode characters with 4-digit hex', () => {
      HexEncode.options = 'unicode';
      HexDecode.options = 'unicode';

      expect(HexEncode.fn('A')).toBe('0041');
      expect(HexEncode.fn('Hello')).toBe('00480065006c006c006f');
    });

    it('round-trips unicode text', () => {
      HexEncode.options = 'unicode';
      HexDecode.options = 'unicode';

      const inputs = ['Hello', 'ABC123', 'Test!'];
      inputs.forEach((input) => {
        const encoded = HexEncode.fn(input);
        const decoded = HexDecode.fn(encoded);
        expect(decoded).toBe(input);
      });
    });

  });

  describe('Hex Decode', () => {
    it('handles uppercase hex', () => {
      HexDecode.options = 'ascii';
      expect(HexDecode.fn('48656C6C6F')).toBe('Hello');
    });

    it('handles lowercase hex', () => {
      HexDecode.options = 'ascii';
      expect(HexDecode.fn('48656c6c6f')).toBe('Hello');
    });

    it('handles mixed case hex', () => {
      HexDecode.options = 'ascii';
      expect(HexDecode.fn('48656C6c6F')).toBe('Hello');
    });
  });
});
