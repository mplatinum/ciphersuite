import { HexOptionsType, SetOptions, useCipherStore } from '../../util/store';
import { memo } from 'react';

export default memo(function HexOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [HexOptionsType, SetOptions];

  return (
    <div>
      <label className="flex items-center gap-3 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400 font-medium">Padding:</span>
        <select
          className="flex-1 input text-sm"
          value={options}
          onChange={(evt) =>
            setOptions(index, evt.target.value as HexOptionsType)
          }
        >
          <option value="ascii">ASCII</option>
          <option value="unicode">Unicode</option>
        </select>
      </label>
    </div>
  );
});
