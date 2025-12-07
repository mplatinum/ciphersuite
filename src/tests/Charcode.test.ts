import { describe, it, expect } from 'vitest';
import CharcodeEncode from '../operations/CharcodeEncode';
import CharcodeDecode from '../operations/CharcodeDecode';
import { testCipherPair, testRoundTrip } from '../test/test-helpers';

describe('Charcode Encode/Decode', () => {
  testCipherPair(CharcodeEncode, CharcodeDecode, [
    { plaintext: 'A', ciphertext: '65' },
    { plaintext: 'ABC', ciphertext: '65 66 67' },
    { plaintext: 'Hello', ciphertext: '72 101 108 108 111' },
    { plaintext: ' ', ciphertext: '32' },
    { plaintext: '!', ciphertext: '33' },
    { plaintext: '123', ciphertext: '49 50 51' },
  ]);

  it('handles empty string encoding', () => {
    expect(CharcodeEncode.fn('')).toBe('');
  });

  testRoundTrip(CharcodeEncode, CharcodeDecode, [
    'The quick brown fox',
    'UPPERCASE',
    'lowercase',
    'MixedCase123',
    'Special!@#$%',
    'Line1\nLine2',
  ]);

  it('handles extended ASCII characters', () => {
    const input = 'café';
    const encoded = CharcodeEncode.fn(input);
    const decoded = CharcodeDecode.fn(encoded);
    expect(decoded).toBe(input);
  });

  it('handles tab character', () => {
    const input = 'A\tB';
    expect(CharcodeEncode.fn(input)).toBe('65 9 66');
    expect(CharcodeDecode.fn('65 9 66')).toBe(input);
  });

  it('handles newline character', () => {
    const input = 'A\nB';
    expect(CharcodeEncode.fn(input)).toBe('65 10 66');
    expect(CharcodeDecode.fn('65 10 66')).toBe(input);
  });
});
