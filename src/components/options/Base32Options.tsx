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
      <label className="flex items-center gap-2 text-sm">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Variant:</span>
        <select
          className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
