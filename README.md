# CipherSuite

An interactive web application for encoding and decoding text using various ciphers and encoding methods. Built with React, TypeScript, and Tailwind CSS, CipherSuite provides an intuitive drag-and-drop interface for chaining multiple cryptographic operations together.

## Features

- Cipher and Encoding Operations including:
  - Classic ciphers: Caesar, Vigenère, Affine, Atbash, Beaufort, Playfair, Rail Fence
  - Substitution ciphers: A1Z26, ADFGVX, Bifid, Polybius Square
  - Modern encoding: Base64, Base32, Hexadecimal, Binary, Morse Code

- Drag-and-Drop: Compose multiple operations in sequence
- Modes: Switch between Encipher and Decipher modes
- Configurable Operations: Many ciphers support custom keys and parameters
- Dark/Light theme support
- Real-time Processing: See results instantly as you build your operation chain
- Responsive Design

## Technology Stack

- React
- TypeScript
- Vite
- Zustand
- Tailwind
- @hello-pangea/dnd
- Vitest

### Adding a New Operation

1. Create operation files in `src/operations/` (e.g., `YourCipherEncode.tsx` and `YourCipherDecode.tsx`)
2. Implement the operation with `id`, `name`, `slug`, and `fn` properties
3. For operations with configuration options:
   - Add the options type to `src/util/store.ts`
   - Create an options component in `src/components/options/`
   - Add a `render` property to the operation
4. Register the operation in `src/util/operations.ts`

## Acknowledgments

- Inspired by [CyberChef](https://gchq.github.io/CyberChef/)