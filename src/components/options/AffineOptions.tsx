import {
  AffineOptionsType,
  SetOptions,
  useCipherStore,
} from '../../util/store';
import { memo } from 'react';

export default memo(function AffineOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [AffineOptionsType, SetOptions];

  return (
    <div className="space-y-3">
      <div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">a:</span>
          <input
            className="w-24 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
            type="number"
            value={options.a}
            onChange={({ target: { value } }) =>
              setOptions(index, { ...options, a: parseInt(value, 10) })
            }
          />
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">b:</span>
          <input
            className="w-24 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            type="number"
            min="0"
            value={options.b}
            onChange={({ target: { value } }) =>
              setOptions(index, { ...options, b: parseInt(value, 10) })
            }
          />
        </label>
      </div>
    </div>
  );
});
