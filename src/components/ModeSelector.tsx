import { memo } from 'react';
import { CipherSuiteState, CipherMode, useCipherStore, Operation } from '../util/store';
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
    <div className="flex h-14 shrink-0 items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4">
      <label className="text-center w-full flex items-center justify-center gap-3">
        <span className="font-semibold text-gray-900 dark:text-white">Cipher Mode:</span>
        <select
          className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 dark:text-gray-100 text-gray-900 font-medium rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600 transition-all cursor-pointer hover:border-primary-400 dark:hover:border-primary-700"
          value={mode}
          onChange={(evt) => {
            setMode(evt.target.value as CipherMode);
            setInput(output);
            const list = mode === 'encipher' ? decipherOps : encipherOps;
            const newOperations = operations.reverse().map(op => {
              const newOp = list.find((l) => l.slug === op.slug);
              return {
                ...newOp,
                id: nanoid(),
                options: op.options
              } as Operation
            });
            setOperations(newOperations);
          }}
        >
          <option value="encipher">Encipher</option>
          <option value="decipher">Decipher</option>
        </select>
      </label>
    </div>
  );
});
