import { FC, useCallback } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';

type TCircleContainer = {
  items: Array<string | number>;
  modifiedElements?: Array<number>;
  inProgressElements?: Array<number>;
  showIndex?: boolean;
};

export const CircleContainer: FC<TCircleContainer> = ({
  items,
  modifiedElements,
  inProgressElements,
  showIndex = false,
}) => {
  const calculateCircleState = useCallback(
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
    [inProgressElements, modifiedElements]
  );

  const calculateHead = (ind: number) => {
    if (ind === items.length - 1) {
      return 'top';
    } else return undefined;
  };

  return (
    <>
      {items.map((el, ind) => (
        <Circle
          state={calculateCircleState(ind)}
          head={calculateHead(ind)}
          key={ind}
          index={showIndex ? ind : undefined}
          letter={el.toString()}
        />
      ))}
    </>
  );
};
