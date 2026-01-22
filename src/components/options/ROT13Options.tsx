import { ROT13OptionsType, useCipherStore, SetOptions } from '../../util/store';
import { memo } from 'react';

export default memo(function ROT13Options({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [ROT13OptionsType, SetOptions];

  return (
    <div className="space-y-3">
      <div>
        <label className="flex items-center gap-3 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium">Offset:</span>
          <input
            className="w-24 input text-sm"
            type="number"
            value={options.offset}
            onChange={({ target: { value } }) =>
              setOptions(index, { ...options, offset: parseInt(value, 10) })
            }
          />
        </label>
      </div>
      <div>
        <label className="flex items-center gap-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.keepNonAlphanumeric}
            onChange={() =>
              setOptions(index, {
                ...options,
                keepNonAlphanumeric: !options.keepNonAlphanumeric,
              })
            }
            className="w-4 h-4 text-neutral-600 bg-neutral-100 border-neutral-300 rounded focus:ring-neutral-500 dark:focus:ring-neutral-600 dark:bg-neutral-800 dark:border-neutral-600"
          />
          <span className="text-neutral-600 dark:text-neutral-400">Keep non-alphanumeric</span>
        </label>
      </div>
      <div>
        <label className="flex items-center gap-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.rotateNumbers}
            onChange={() =>
              setOptions(index, {
                ...options,
                rotateNumbers: !options.rotateNumbers,
              })
            }
            className="w-4 h-4 text-neutral-600 bg-neutral-100 border-neutral-300 rounded focus:ring-neutral-500 dark:focus:ring-neutral-600 dark:bg-neutral-800 dark:border-neutral-600"
          />
          <span className="text-neutral-600 dark:text-neutral-400">Rotate Numbers</span>
        </label>
      </div>
    </div>
  );
});
