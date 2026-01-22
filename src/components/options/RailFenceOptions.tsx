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
        <label className="flex items-center gap-3 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium">Rails:</span>
          <input
            className="w-24 input text-sm"
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
        <label className="flex items-center gap-3 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium">Offset:</span>
          <input
            className="w-24 input text-sm"
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
