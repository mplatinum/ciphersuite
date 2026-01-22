import { BifidOptionsType, SetOptions, useCipherStore } from '../../util/store';
import { memo } from 'react';

export default memo(function BifidOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [BifidOptionsType, SetOptions];

  return (
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
  );
});
