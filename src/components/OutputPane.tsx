import { useEffect, useState } from 'react';
import { CipherSuiteState, useCipherStore } from '../util/store';
import { shallow } from 'zustand/shallow';
import OutputError from '../util/output-error';

export default function OutputPane() {
  const [operations, input, output, setOutput] = useCipherStore(
    (state: CipherSuiteState) => [
      state.operations,
      state.input,
      state.output,
      state.setOutput,
    ],
    shallow
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let outputRaw;
    try {
      outputRaw = operations.reduce((prev, current) => {
        return current.fn(prev);
      }, input);
    } catch (err) {
      if (err instanceof Error) {
        setOutput(err.message);
      }
      if (err instanceof OutputError) {
        return;
      }
      console.error(err);
      return;
    }
    setOutput(outputRaw);
  }, [input, operations, setOutput]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex grow h-1/2 flex-col relative">
      <div className="section-header">
        <span className="section-title">Output</span>
      </div>
      <textarea
        readOnly
        value={output}
        className="min-h-[250px] md:min-h-0 h-full resize-none p-5 focus-visible:outline-none bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 cursor-default font-mono text-sm leading-relaxed"
      ></textarea>
      <button
        onClick={() => void handleCopy()}
        disabled={!output}
        className={`absolute bottom-4 right-4 p-2.5 rounded-full transition-all duration-200 ${copied 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:text-neutral-800 dark:hover:text-neutral-100'
        } disabled:opacity-40 disabled:cursor-not-allowed elevation-1`}
        aria-label="Copy to clipboard"
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
