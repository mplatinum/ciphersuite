import { memo } from 'react';
import { CipherSuiteState, useCipherStore, Operation } from '../util/store';
import { shallow } from 'zustand/shallow';
import { decipherOps, encipherOps } from '../util/operations';
import { nanoid } from 'nanoid';

export default memo(function ModeSelector() {
  const [mode, output, setMode, operations, setOperations, setInput] = useCipherStore(
    (state: CipherSuiteState) => [
      state.mode,
      state.output,
      state.setMode,
      state.operations,
      state.setOperations,
      state.setInput,
    ],
    shallow
  );

  return (
    <div className="flex h-14 shrink-0 items-center bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6">
      <div className="w-full flex items-center justify-center gap-4">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Mode</span>
        <div className="flex bg-neutral-200 dark:bg-neutral-800 rounded-full p-1 border border-neutral-300 dark:border-neutral-700">
          <button
            onClick={() => {
              if (mode !== 'encipher') {
                setMode('encipher');
                setInput(output);
                const newOperations = operations.reverse().map(op => {
                  const newOp = encipherOps.find((l) => l.slug === op.slug);
                  return {
                    ...newOp,
                    id: nanoid(),
                    options: op.options
                  } as Operation
                });
                setOperations(newOperations);
              }
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              mode === 'encipher'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-black shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Encipher
          </button>
          <button
            onClick={() => {
              if (mode !== 'decipher') {
                setMode('decipher');
                setInput(output);
                const newOperations = operations.reverse().map(op => {
                  const newOp = decipherOps.find((l) => l.slug === op.slug);
                  return {
                    ...newOp,
                    id: nanoid(),
                    options: op.options
                  } as Operation
                });
                setOperations(newOperations);
              }
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              mode === 'decipher'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-black shadow-md'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Decipher
          </button>
        </div>
      </div>
    </div>
  );
});
