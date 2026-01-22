import {
  SubstitutionOptionsType,
  SetOptions,
  useCipherStore,
} from '../../util/store';
import { memo } from 'react';

export default memo(function SubstituionOptions({ index }: { index: number }) {
  const [options, setOptions] = useCipherStore((state) => [
    state.operations[index].options,
    state.setOptions,
  ]) as [SubstitutionOptionsType, SetOptions];

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium mb-1 block">From:</span>
          <input
            className="w-full input text-sm"
            type="text"
            value={options.from}
            onChange={({ target: { value } }) =>
              setOptions(index, {
                ...options,
                from: value,
              })
            }
            placeholder="Characters to replace"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium mb-1 block">To:</span>
          <input
            className="w-full input text-sm"
            type="text"
            value={options.to}
            onChange={({ target: { value } }) =>
              setOptions(index, {
                ...options,
                to: value,
              })
            }
            placeholder="Replacement characters"
          />
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={options.ignoreCase}
            onChange={() =>
              setOptions(index, {
                ...options,
                ignoreCase: !options.ignoreCase,
              })
            }
            className="w-4 h-4 text-neutral-600 bg-neutral-100 border-neutral-300 rounded focus:ring-neutral-500 dark:focus:ring-neutral-600 dark:bg-neutral-800 dark:border-neutral-600"
          />
          <span className="text-neutral-600 dark:text-neutral-400">Ignore case</span>
        </label>
      </div>
    </div>
  );
});
