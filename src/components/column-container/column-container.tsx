import { FC } from 'react';
import { ElementStates } from '../../types/element-states';
import { Column } from '../ui/column/column';

type TColumnContainer = {
  items?: Array<number>;
  startInd?: number;
  currentInd?: number;
  nextInd?: number;
  endInd?: number;
};

export const ColumnContainer: FC<TColumnContainer> = ({
  items,
  startInd,
  currentInd,
  nextInd,
  endInd,
}) => {
  const calculateColumnState = (ind: number) => {
    let circleState = ElementStates.Default;
    if (
      startInd !== undefined &&
      currentInd !== undefined &&
      nextInd !== undefined &&
      endInd !== undefined
    ) {
      if (
        ind < startInd ||
        (ind === currentInd && ind === nextInd) ||
        ind > endInd ||
        (ind === currentInd && ind === endInd)
      ) {
        circleState = ElementStates.Modified;
      } else if (ind === currentInd || ind === nextInd) {
        circleState = ElementStates.Changing;
      }
    }
    return circleState;
  };

  return (
    <>
      {items &&
        items.map((el, ind) => (
          <Column state={calculateColumnState(ind)} key={ind} index={el} />
        ))}
    </>
  );
};
