import { memo } from 'react';
import { CipherSuiteState, useCipherStore } from '../util/store';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { shallow } from 'zustand/shallow';
import { remove } from '../util/dnd-operations';
import { saveChainToFile, loadChainFromFile } from '../util/chain-storage';


export default memo(function MyOperationsList() {
  const [operations, setOperations, mode, setMode] = useCipherStore(
    (state: CipherSuiteState) => [state.operations, state.setOperations, state.mode, state.setMode],
    shallow
  );

  const handleSave = () => {
    saveChainToFile(mode, operations);
  };

  const handleLoad = async () => {
    try {
      const { mode: loadedMode, operations: loadedOps } = await loadChainFromFile();
      setMode(loadedMode);
      setOperations(loadedOps);
    } catch (err) {
      if (err instanceof Error && err.message !== 'No file selected') {
        alert(`Failed to load chain: ${err.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col mb-4 md:mb-0 md:border-r md:border-neutral-200 dark:md:border-neutral-800 md:min-h-0 h-full">
      <div className="section-header relative">
        <span className="section-title">My Operations</span>
        <div className="absolute right-3 flex gap-1">
          <button
            onClick={() => void handleLoad()}
            className="btn-icon text-neutral-500 dark:text-neutral-400"
            title="Load chain"
            aria-label="Load chain from file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
          <button
            onClick={handleSave}
            className="btn-icon text-neutral-500 dark:text-neutral-400"
            title="Save chain"
            aria-label="Save chain to file"
          >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

        </div>
      </div>
      <div className="md:min-h-0 h-[350px] md:h-full surface p-4 overflow-y-auto">
        <Droppable droppableId="myOperations">
          {(provided) => (
            <div
              className={
                'min-h-full flex flex-col' +
                (operations.length === 0 ? ' justify-center' : '')
              }
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {operations.length === 0 ? (
                <div className="text-center text-neutral-500 dark:text-neutral-400 p-8 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/50">
                  <svg
                    className="mx-auto h-14 w-14 text-neutral-300 dark:text-neutral-600 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="font-semibold text-neutral-700 dark:text-neutral-300">Drag operations here</p>
                  <p className="text-sm mt-2 text-neutral-400 dark:text-neutral-500">Build your cipher chain</p>
                  <p className="text-xs mt-3 italic text-neutral-400 dark:text-neutral-600">Note: Not all operations compose together</p>
                </div>
              ) : (
                operations.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="flex flex-col mb-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl elevation-2 border border-neutral-200 dark:border-neutral-800"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={provided.draggableProps.style}
                      >
                        <div className="flex items-center">
                          <div {...provided.dragHandleProps} className="cursor-move p-1 -ml-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                            <svg
                              className="text-neutral-400 dark:text-neutral-500"
                              width="20"
                              height="20"
                              aria-labelledby={`dragIcon-${item.id}`}
                              viewBox="0 0 24 24"
                            >
                              <title id={`dragIcon-${item.id}`}>
                                Drag Operation
                              </title>
                              <path
                                fill="currentColor"
                                d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                              />
                            </svg>
                          </div>
                          <span className="ml-2 font-medium text-neutral-700 dark:text-neutral-200">{item.name}</span>
                          <button
                            className="ml-auto btn-icon text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() =>
                              setOperations(remove(operations, index))
                            }
                            aria-label="Delete operation"
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="3.77 3.27 16.47 17.45"
                              aria-labelledby="trashIcon"
                            >
                              <title id="trashIcon">Delete</title>
                              <path d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                        {item.render && (
                          <div className="border-t border-neutral-200 dark:border-neutral-700 mt-4 pt-4">
                            <div className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
                              Options
                            </div>
                            {item.render(index)}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
});
