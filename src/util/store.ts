import { ReactNode } from 'react';
import { createWithEqualityFn } from 'zustand/traditional';

export type SubstitutionOptionsType = {
  from: string;
  to: string;
  ignoreCase: boolean;
};
export type AffineOptionsType = {
  a: number;
  b: number;
};
export type VigenereOptionsType = {
  key: string;
};
export type CaesarOptionsType = {
  shift: number;
};
export type PlayfairOptionsType = {
  key: string;
};
export type ColumnarTranspositionOptionsType = {
  key: string;
};
export type BeaufortOptionsType = {
  key: string;
};
export type ROT13OptionsType = {
  offset: number;
  keepNonAlphanumeric: boolean;
  rotateNumbers: boolean;
};
export type RailFenceOptionsType = {
  rails: number;
  offset: number;
};
export type BifidOptionsType = {
  square: string;
};
export type ADFGVXOptionsType = {
  to: boolean;
  key: string;
  square: string;
};
export type PolybiusSquareOptionsType = {
  to: boolean;
  spaces: boolean;
  square: string;
};
export type HexOptionsType = 'ascii' | 'unicode';
export type Base32OptionsType =
  | 'RFC4648'
  | 'RFC4648-HEX'
  | 'Crockford'
  | 'RFC3548';

export type Options =
  | HexOptionsType
  | Base32OptionsType
  | PolybiusSquareOptionsType
  | ADFGVXOptionsType
  | BifidOptionsType
  | RailFenceOptionsType
  | ROT13OptionsType
  | VigenereOptionsType
  | CaesarOptionsType
  | PlayfairOptionsType
  | ColumnarTranspositionOptionsType
  | BeaufortOptionsType
  | AffineOptionsType
  | SubstitutionOptionsType;

export type Operation = {
  id: string;
  name: string;
  render?: (index: number) => ReactNode;
  slug: string;
  options?: Options;
  fn: (input: string) => string;
  category?: string;
};

export type CipherMode = 'encipher' | 'decipher';

export type SetOptions = (index: number, options: Options) => void;

export type CipherSuiteState = {
  input: string;
  setInput: (input: string) => void;
  output: string;
  setOutput: (output: string) => void;
  mode: CipherMode;
  setMode: (mode: CipherMode) => void;
  operations: Operation[];
  setOperations: (operations: Operation[]) => void;
  resetOperations: () => void;
  setOptions: SetOptions;
};

export const useCipherStore = createWithEqualityFn<CipherSuiteState>((set) => ({
  input: '',
  setInput: (input: string) => set((state) => ({ ...state, input })),
  output: '',
  setOutput: (output: string) => set((state) => ({ ...state, output })),
  mode: 'encipher',
  setMode: (mode: CipherMode) => set((state) => ({ ...state, mode })),
  operations: [],
  setOperations: (operations: Operation[]) =>
    set((state) => ({ ...state, operations })),
  resetOperations: () => set((state) => ({ ...state, operations: [] })),
  setOptions: (index, options) =>
    set((state) => {
      const v = state.operations[index];
      const a = state.operations.slice(0, index);
      const b = state.operations.slice(index + 1);
      return {
        ...state,
        operations: [...a, { ...v, options }, ...b],
      };
    }),
}));
