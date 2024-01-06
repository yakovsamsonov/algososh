import { FC, useCallback } from 'react';
import { ElementStates } from '../../types/element-states';
import { Column } from '../ui/column/column';

type TColumnContainer = {
  items?: Array<number>;
  modifiedElements?: Array<number>;
  inProgressElements?: Array<number>;
};

export const ColumnContainer: FC<TColumnContainer> = ({
  items,
  modifiedElements,
  inProgressElements,
}) => {
  const calculateColumnState = useCallback(
    (ind: number) => {
      let circleState = ElementStates.Default;
      if (modifiedElements?.includes(ind)) {
        circleState = ElementStates.Modified;
      }
      if (inProgressElements?.includes(ind)) {
        circleState = ElementStates.Changing;
      }
      return circleState;
    },
    [modifiedElements, inProgressElements]
  );

  return (
    <>
      {items &&
        items.map((el, ind) => (
          <Column state={calculateColumnState(ind)} key={ind} index={el} />
        ))}
    </>
  );
};
