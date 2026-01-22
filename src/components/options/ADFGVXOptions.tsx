import {
  ADFGVXOptionsType,
  SetOptions,
  useCipherStore,
} from '../../util/store';
import { memo } from 'react';

export default memo(function ADFGVXOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [ADFGVXOptionsType, SetOptions];

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium mb-1 block">Square (6x6 grid):</span>
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
            placeholder="Enter 36 characters"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium mb-1 block">Key:</span>
          <input
            className="w-full input text-sm"
            type="text"
            value={options.key}
            onChange={(e) =>
              setOptions(index, { ...options, key: e.target.value })
            }
            placeholder="Enter key"
          />
        </label>
      </div>
    </div>
  );
});
