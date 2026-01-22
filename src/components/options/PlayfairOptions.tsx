import { PlayfairOptionsType, useCipherStore, SetOptions } from '../../util/store';
import { memo } from 'react';

export default memo(function PlayfairOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [PlayfairOptionsType, SetOptions];

  return (
    <div>
      <label className="flex items-center gap-3 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400 font-medium">Key:</span>
        <input
          type="text"
          value={options.key}
          onChange={({ target: { value } }) =>
            setOptions(index, { ...options, key: value })
          }
          className="flex-1 input text-sm"
          placeholder="Enter key (letters only)"
        />
      </label>
    </div>
  );
});
