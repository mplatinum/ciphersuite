import { it, expect } from 'vitest';

/**
 * Helper to test encode/decode pairs with multiple test cases
 */
export function testCipherPair(
  encodeOp: { fn: (input: string) => string; options?: unknown },
  decodeOp: { fn: (input: string) => string; options?: unknown },
  testCases: Array<{ plaintext: string; ciphertext: string; description?: string }>
) {
  testCases.forEach(({ plaintext, ciphertext, description }) => {
    const desc = description || `"${plaintext.substring(0, 20)}${plaintext.length > 20 ? '...' : ''}"`;

    it(`encodes ${desc}`, () => {
      expect(encodeOp.fn(plaintext)).toBe(ciphertext);
    });

    it(`decodes ${desc}`, () => {
      expect(decodeOp.fn(ciphertext)).toBe(plaintext);
    });
  });
}

/**
 * Helper to test that operations are inverses of each other
 */
export function testRoundTrip(
  encodeOp: { fn: (input: string) => string; options?: unknown },
  decodeOp: { fn: (input: string) => string; options?: unknown },
  inputs: string[]
) {
  inputs.forEach((input) => {
    it(`round-trips: "${input.substring(0, 30)}${input.length > 30 ? '...' : ''}"`, () => {
      const encoded = encodeOp.fn(input);
      const decoded = decodeOp.fn(encoded);
      expect(decoded).toBe(input);
    });
  });
}

/**
 * Helper to test error cases
 */
export function testErrors(
  operation: { fn: (input: string) => string; options?: unknown },
  errorCases: Array<{ input: string; errorMessage?: string; description: string }>
) {
  errorCases.forEach(({ input, errorMessage, description }) => {
    it(`throws error: ${description}`, () => {
      if (errorMessage) {
        expect(() => operation.fn(input)).toThrow(errorMessage);
      } else {
        expect(() => operation.fn(input)).toThrow();
      }
    });
  });
}
