import { describe, it, expect } from 'vitest';
import BeaufortEncode from '../operations/BeaufortEncode';
import BeaufortDecode from '../operations/BeaufortDecode';
import { testCipherPair, testRoundTrip } from '../test/test-helpers';

describe('Beaufort Encode/Decode', () => {
  testCipherPair(BeaufortEncode, BeaufortDecode, [
    { plaintext: 'DEFENDTHEEASTWALLOFTHECASTLE', ciphertext: 'CKMPVCPVWPIWUJOGIUAPVWRIWUUK' },
  ]);

  testRoundTrip(BeaufortEncode, BeaufortDecode, [
    'ATTACK AT DAWN',
    'MEET ME AT NOON',
    'The quick brown fox jumps over the lazy dog',
    'UPPERCASE TEXT',
    'lowercase text',
    'MixedCase123Text',
  ]);

  describe('Beaufort properties', () => {
    it('is self-reciprocal (encoding twice returns original)', () => {
      const inputs = ['Hello', 'TEST', 'AbCdEf'];
      inputs.forEach((input) => {
        const once = BeaufortEncode.fn(input);
        const twice = BeaufortEncode.fn(once);
        expect(twice).toBe(input);
      });
    });

    it('preserves case', () => {
      const result = BeaufortEncode.fn('HeLLo');
      expect(result[0]).toMatch(/[A-Z]/);
      expect(result[1]).toMatch(/[a-z]/);
    });

    it('preserves non-alphabetic characters', () => {
      const result = BeaufortEncode.fn('Hello, World 123!');
      expect(result).toContain(',');
      expect(result).toContain(' ');
      expect(result).toContain('123');
      expect(result).toContain('!');
    });
  });
});
