import { memo } from 'react';
import { CipherSuiteState, useCipherStore } from '../util/store';
import { shallow } from 'zustand/shallow';

export default memo(function InputPane() {
  const [input, setInput] = useCipherStore(
    (state: CipherSuiteState) => [state.input, state.setInput],
    shallow
  );

  return (
    <div className="flex flex-col h-1/2 border-b border-neutral-200 dark:border-neutral-800">
      <div className="section-header">
        <span className="section-title">Input</span>
      </div>
      <textarea
        placeholder="Type your secret text here..."
        value={input}
        onChange={(evt) => setInput(evt.target.value)}
        className="min-h-[250px] md:min-h-0 h-full resize-none p-5 focus-visible:outline-none bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:bg-neutral-100 dark:focus:bg-neutral-850 transition-colors duration-200 font-mono text-sm leading-relaxed"
      ></textarea>
    </div>
  );
});
