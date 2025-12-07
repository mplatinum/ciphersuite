import {
  SubstitutionOptionsType,
  SetOptions,
  useCipherStore,
} from '../../util/store';
import { memo } from 'react';

export default memo(function SubstituionOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [SubstitutionOptionsType, SetOptions];

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">From:</span>
          <input
            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            type="text"
            value={options.from}
            onChange={({ target: { value } }) =>
              setOptions(index, {
                ...options,
                from: value,
              })
            }
            placeholder="Characters to replace"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">To:</span>
          <input
            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            type="text"
            value={options.to}
            onChange={({ target: { value } }) =>
              setOptions(index, {
                ...options,
                to: value,
              })
            }
            placeholder="Replacement characters"
          />
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.ignoreCase}
            onChange={() =>
              setOptions(index, {
                ...options,
                ignoreCase: !options.ignoreCase,
              })
            }
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-gray-700 dark:text-gray-300">Ignore case</span>
        </label>
      </div>
    </div>
  );
});
