import {
  RailFenceOptionsType,
  useCipherStore,
  SetOptions,
} from '../../util/store';
import { memo } from 'react';

export default memo(function RailFenceOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [RailFenceOptionsType, SetOptions];

  return (
    <div className="space-y-3">
      <div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Rails:</span>
          <input
            className="w-24 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            type="number"
            min="2"
            value={options.rails}
            onChange={({ target: { value } }) =>
              setOptions(index, { ...options, rails: parseInt(value, 10) })
            }
          />
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Offset:</span>
          <input
            className="w-24 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            type="number"
            min="0"
            value={options.offset}
            onChange={({ target: { value } }) =>
              setOptions(index, { ...options, offset: parseInt(value, 10) })
            }
          />
        </label>
      </div>
    </div>
  );
});
