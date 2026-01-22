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
        <div className="md:border-r mb-4 md:mb-0 md:border-neutral-200 dark:md:border-neutral-800 flex flex-col h-full md:min-h-0">
          <div className="section-header">
            <span className="section-title">Available Operations</span>
          </div>
          <div
            className="h-[350px] md:h-full overflow-y-auto p-4 surface"
            ref={provided.innerRef}
          >
            {categories.map((category) => (
              <Accordion
                key={category}
                title={category}
              >
                {category === "Encoding" && (
                  <div className="bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl mb-3 p-3">
                    <p className="text-center text-sm text-neutral-700 dark:text-neutral-300">
                      ⚠️ These may not compose with other ciphers unless at the end.
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
                            className="mb-2 py-2.5 px-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg cursor-move select-none border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                          >
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.name}</span>
                          </div>
                          {snapshot.isDragging && (
                            <div className="mb-2 py-2.5 px-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg opacity-50 border border-dashed border-neutral-400 dark:border-neutral-600">
                              <span className="text-sm text-neutral-600 dark:text-neutral-300">{item.name}</span>
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
