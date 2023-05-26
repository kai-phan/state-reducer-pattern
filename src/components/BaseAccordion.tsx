import React from 'react';

export type State = {
    openedIndexes: number[];
    type: string;
}

export type Changes = ((state: State) => State) | State

export type ChildrenProps = {
    openedIndexes: number[];
    onItemClick: (index: number) => void;
    // toggle: (index: number) => void;
    // open: (index: number) => void;
}

export type Props = {
    stateReducer?: (state: State, changes: State) => State;
    children?: (props: ChildrenProps) => React.ReactNode;
    openedKeys?: number[];
};

export const ItemClickOpened = 'item-click__opened' as const;
export const ItemClickClosed = 'item-click__closed' as const;

export const preventCloseReducer = (state: State, changes: State) => {
  if (changes.type === ItemClickClosed && state.openedIndexes.length < 2) {
        return { ...changes, openedIndexes: state.openedIndexes };
    }
    return changes;
}

export const singleReducer = (state: State, changes: State) => {
  if (changes.type === ItemClickOpened && state.openedIndexes.length > 0) {
    return { ...changes, openedIndexes: changes.openedIndexes.slice(-1) }
  }

  return changes;
}

export const combineReducer = (...reducer: Props['stateReducer'][]) => {
  return (state: State, changes: State) => {
    return reducer.reduce((acc, reducer) => {
      return reducer?.(state, acc) || changes;
    }, changes)
  }
}

const BaseAccordion: React.FC<Props> = ({ children, openedKeys, stateReducer}) => {
  const [state, setState] = React.useState<State>({openedIndexes: [], type: 'initial'});
  const getOpenedIndexes = () => openedKeys || state.openedIndexes;

  const internalSetState = (changes: Changes) => {
    setState((prevState) => {
      const changesObject = typeof changes === 'function' ? changes(prevState) : changes;
      return stateReducer ? stateReducer(prevState, changesObject) : changesObject;
    });
  }

  const onItemClick = (index: number) => {
    internalSetState((prevState) => {
      const isOpened = prevState.openedIndexes.includes(index);

      return {
        type: isOpened ? ItemClickClosed : ItemClickOpened,
        openedIndexes: isOpened ? getOpenedIndexes().filter((i) => i !== index) : [...getOpenedIndexes(), index],
      };
    });
  }

   return (
      <React.Fragment>
        {children && children({ openedIndexes: getOpenedIndexes(), onItemClick })}
      </React.Fragment>
   );
};

export default BaseAccordion;