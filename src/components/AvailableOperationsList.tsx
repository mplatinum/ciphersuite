import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Operation } from '../util/store';
import { memo, useMemo } from 'react';
import Accordion from './Accordion';

export default memo(function AvailableOperationsList({
  operations = [],
}: {
  operations: Operation[];
}) {
  const groupedOperations = useMemo(() => {
    const groups: Record<string, Operation[]> = {};
    operations.forEach((op) => {
      const category = op.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(op);
    });
    return groups;
  }, [operations]);

  const categories = Object.keys(groupedOperations).sort();

  return (
    <Droppable droppableId="items" isDropDisabled={true}>
      {(provided) => (
        <div className="md:border-r mb-4 md:mb-0 md:border-gray-200 dark:md:border-gray-700 flex flex-col h-full md:min-h-0">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4">
            <div className="text-center font-semibold text-gray-900 dark:text-white">Available Operations</div>
          </div>
          <div
            className="h-[350px] md:h-full overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900"
            ref={provided.innerRef}
          >
            {categories.map((category) => (
              <Accordion
                key={category}
                title={category}
              >
                {category === "Encoding" && (
                  <div className="border border-gray-200 dark:bg-[#a1a1a110] dark:border-gray-700 rounded-xl mb-2 p-1">
                    <p className="text-center text-sm">
                      Warning: These probably won't compose with other cipher operations unless they're at the end.
                    </p>
                  </div>
                )}
                {groupedOperations[category].map((item) => {
                  const index = operations.indexOf(item);
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <>
                          <div
                            className="mb-2 p-3 border dark:bg-[#a1a1a110] border-gray-200 dark:border-gray-800 cursor-move select-none"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                          >
                            <span className="text-gray-900 dark:text-white font-medium">{item.name}</span>
                          </div>
                          {snapshot.isDragging && (
                            <div className="mb-2 p-3 card opacity-50">
                              <span className="text-gray-900 dark:text-white font-medium">{item.name}</span>
                            </div>
                          )}
                        </>
                      )}
                    </Draggable>
                  );
                })}
              </Accordion>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
});
