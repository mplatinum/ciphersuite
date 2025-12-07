import {
  PolybiusSquareOptionsType,
  SetOptions,
  useCipherStore,
} from '../../util/store';
import { memo } from 'react';

export default memo(function PolybiusSquareOptions({
  index,
}: {
  index: number;
}) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [PolybiusSquareOptionsType, SetOptions];

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">Square (5x5 grid):</span>
          <input
            className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            type="text"
            value={options.square}
            onChange={({ target: { value } }) => {
              const upper = value.toUpperCase();
              setOptions(index, {
                ...options,
                square: upper,
              });
            }}
            placeholder="Enter 25 characters"
          />
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.spaces}
            onChange={() =>
              setOptions(index, {
                ...options,
                spaces: !options.spaces,
              })
            }
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-gray-700 dark:text-gray-300">Spaces</span>
        </label>
      </div>
    </div>
  );
});
