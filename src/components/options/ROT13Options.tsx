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
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Offset:</span>
          <input
            className="w-24 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            type="number"
            value={options.offset}
            onChange={({ target: { value } }) =>
              setOptions(index, { ...options, offset: parseInt(value, 10) })
            }
          />
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.keepNonAlphanumeric}
            onChange={() =>
              setOptions(index, {
                ...options,
                keepNonAlphanumeric: !options.keepNonAlphanumeric,
              })
            }
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-gray-700 dark:text-gray-300">Keep non-alphanumeric</span>
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.rotateNumbers}
            onChange={() =>
              setOptions(index, {
                ...options,
                rotateNumbers: !options.rotateNumbers,
              })
            }
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-gray-700 dark:text-gray-300">Rotate Numbers</span>
        </label>
      </div>
    </div>
  );
});
