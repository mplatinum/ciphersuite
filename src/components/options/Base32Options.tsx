import {
  Base32OptionsType,
  SetOptions,
  useCipherStore,
} from '../../util/store';
import { memo } from 'react';

export default memo(function Base32Options({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [Base32OptionsType, SetOptions];

  return (
    <div>
      <label className="flex items-center gap-3 text-sm">
        <span className="text-neutral-600 dark:text-neutral-400 font-medium">Variant:</span>
        <select
          className="flex-1 input text-sm"
          value={options}
          onChange={(evt) =>
            setOptions(index, evt.target.value as Base32OptionsType)
          }
        >
          <option value="RFC4648">RFC4648</option>
          <option value="RFC4648-HEX">RFC4648-HEX</option>
          <option value="Crockford">Crockford</option>
        </select>
      </label>
    </div>
  );
});
