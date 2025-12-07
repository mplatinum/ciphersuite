import { memo } from 'react';
import { CipherSuiteState, useCipherStore } from '../util/store';
import { shallow } from 'zustand/shallow';

export default memo(function InputPane() {
  const [input, setInput] = useCipherStore(
    (state: CipherSuiteState) => [state.input, state.setInput],
    shallow
  );

  return (
    <div className="flex flex-col h-1/2 border-b border-gray-200 dark:border-gray-700">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4">
        <div className="text-center font-semibold text-gray-900 dark:text-white">Input</div>
      </div>
      <textarea
        placeholder="Type your secret text here..."
        value={input}
        onChange={(evt) => setInput(evt.target.value)}
        className="min-h-[250px] md:min-h-0 h-full resize-none p-4 focus-visible:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 focus:ring-inset transition-shadow"
      ></textarea>
    </div>
  );
});
