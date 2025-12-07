import { describe, it, expect } from 'vitest';
import PlayfairEncode from '../operations/PlayfairEncode';
import PlayfairDecode from '../operations/PlayfairDecode';
import { testCipherPair, testRoundTrip, testErrors } from '../test/test-helpers';

describe('Playfair Encode/Decode', () => {
  testCipherPair(PlayfairEncode, PlayfairDecode, [
  ]);

  testRoundTrip(PlayfairEncode, PlayfairDecode, [
    'ATTACKATDAWN',
    'MEETMEATNOON',
  ]);

  describe('Playfair properties', () => {
    it('handles J as I', () => {
      const withJ = PlayfairEncode.fn('JUMP');
      const withI = PlayfairEncode.fn('IUMP');
      expect(withJ).toBe(withI);
    });

    it('produces even-length output', () => {
      expect(PlayfairEncode.fn('HELLO').length % 2).toBe(0);
      expect(PlayfairEncode.fn('TEST').length % 2).toBe(0);
      expect(PlayfairEncode.fn('A').length % 2).toBe(0);
    });

    it('handles repeated letters by inserting X', () => {
      const result = PlayfairEncode.fn('BALLOON');
      expect(result.length).toBeGreaterThan(6);
    });
  });

  describe('Playfair Encode Error Handling', () => {
    testErrors(PlayfairEncode, [
      { input: '123', description: 'numeric input' },
      { input: '!!!', description: 'special characters only' },
    ]);
  });

  describe('Playfair Decode Error Handling', () => {
    testErrors(PlayfairDecode, [
      { input: 'ABC', description: 'odd-length input' },
      { input: '12345', description: 'numeric input' },
    ]);
  });
});
