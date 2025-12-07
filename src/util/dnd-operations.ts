import { DraggableLocation } from '@hello-pangea/dnd';
import { Operation } from './store';
import { nanoid } from 'nanoid';

export function reorder(
  list: Operation[],
  startIndex: number,
  endIndex: number
) {
  const listCopy = Array.from(list);
  const [removed] = listCopy.splice(startIndex, 1);
  listCopy.splice(endIndex, 0, removed);

  return listCopy;
}

export function copy(
  source: Operation[],
  destination: Operation[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: nanoid() });
  return destClone;
}

export function remove(list: Operation[], index: number) {
  const start = list.slice(0, index);
  const end = list.slice(index + 1);

  return [...start, ...end];
}
