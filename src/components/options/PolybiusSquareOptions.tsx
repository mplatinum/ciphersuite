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
          <span className="text-neutral-600 dark:text-neutral-400 font-medium mb-1 block">Square (5x5 grid):</span>
          <input
            className="w-full input text-sm"
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
        <label className="flex items-center gap-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.spaces}
            onChange={() =>
              setOptions(index, {
                ...options,
                spaces: !options.spaces,
              })
            }
            className="w-4 h-4 text-neutral-600 bg-neutral-100 border-neutral-300 rounded focus:ring-neutral-500 dark:focus:ring-neutral-600 dark:bg-neutral-800 dark:border-neutral-600"
          />
          <span className="text-neutral-600 dark:text-neutral-400">Spaces</span>
        </label>
      </div>
    </div>
  );
});
