import {
  VigenereOptionsType,
  useCipherStore,
  SetOptions,
} from '../../util/store';
import { memo } from 'react';

export default memo(function VigenereOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [VigenereOptionsType, SetOptions];

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
          placeholder="Enter key"
        />
      </label>
    </div>
  );
});
