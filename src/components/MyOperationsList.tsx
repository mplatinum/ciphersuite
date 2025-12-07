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
    <div className="flex flex-col mb-4 md:mb-0 md:border-r md:border-gray-200 dark:md:border-gray-700 md:min-h-0 h-full">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="w-16"></div>
          <span className="font-semibold text-gray-900 dark:text-white">My Operations</span>
          <div className="flex gap-1 w-16 justify-end">
            <button
              onClick={handleLoad}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="Load chain"
              aria-label="Load chain from file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button
              onClick={handleSave}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              title="Save chain"
              aria-label="Save chain to file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:min-h-0 h-[350px] md:h-full bg-gray-50 dark:bg-gray-900 p-3 overflow-y-auto">
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
                <div className="text-center text-gray-500 dark:text-gray-400 p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="font-medium">Drag and drop operations here</p>
                  <p className="text-sm mt-1">Build your cipher chain</p>
                  <p className="text-sm italic mt-1">Note that not all operations compose</p>
                </div>
              ) : (
                operations.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="flex flex-col mb-2 p-3 card shadow-md"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={provided.draggableProps.style}
                      >
                        <div className="flex items-center">
                          <div {...provided.dragHandleProps} className="cursor-move">
                            <svg
                              className="mr-2 text-gray-500 dark:text-gray-400"
                              width="24"
                              height="24"
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
                          <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                          <button
                            className="ml-auto btn text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                          <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
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
