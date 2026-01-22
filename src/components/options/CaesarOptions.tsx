import { CaesarOptionsType, useCipherStore, SetOptions } from '../../util/store';
import { memo } from 'react';

export default memo(function CaesarOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [CaesarOptionsType, SetOptions];

  return (
    <div>
      <label className="flex items-center gap-3 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400 font-medium">Shift:</span>
        <input
          className="w-24 input text-sm"
          type="number"
          min="0"
          max="25"
          value={options.shift}
          onChange={({ target: { value } }) =>
            setOptions(index, { ...options, shift: parseInt(value, 10) || 0 })
          }
        />
      </label>
    </div>
  );
});
