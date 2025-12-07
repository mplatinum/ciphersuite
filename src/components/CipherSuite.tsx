import { shallow } from 'zustand/shallow';
import { CipherSuiteState, useCipherStore } from '../util/store';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { decipherOps, encipherOps } from '../util/operations';
import { copy, reorder } from '../util/dnd-operations';
import { memo } from 'react';
import MyOperationsList from './MyOperationsList';
import AvailableOperationsList from './AvailableOperationsList';
import InputPane from './InputPane';
import OutputPane from './OutputPane';
import ModeSelector from './ModeSelector';

export default memo(function CipherSuite() {
  const [mode, operations, setOperations] = useCipherStore(
    (state: CipherSuiteState) => [
      state.mode,
      state.operations,
      state.setOperations,
    ],
    shallow
  );

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        if (destination.droppableId === 'items') {
          return;
        }
        setOperations(reorder(operations, source.index, destination.index));
        break;
      case 'items':
        setOperations(
          copy(
            mode === 'encipher' ? encipherOps : decipherOps,
            operations,
            source,
            destination
          )
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full flex flex-col grow md:min-h-0">
      <ModeSelector />
      <div className="h-full grow md:min-h-0 grid grid-cols-1 md:grid-cols-3">
        <DragDropContext onDragEnd={onDragEnd}>
          <AvailableOperationsList
            operations={mode === 'encipher' ? encipherOps : decipherOps}
          />
          <MyOperationsList />
        </DragDropContext>
        <div className="flex flex-col h-full">
          <InputPane />
          <OutputPane />
        </div>
      </div>
    </div>
  );
});
