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
        <label className="flex items-center gap-3 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium">a:</span>
          <input
            className="w-24 input text-sm"
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
        <label className="flex items-center gap-3 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium">b:</span>
          <input
            className="w-24 input text-sm"
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
