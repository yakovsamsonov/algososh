import { FC } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';

type TCircleContainer = {
  items: Array<string | number>;
  head?: number;
  tail?: number;
  showIndex?: boolean;
};

export const CircleContainer: FC<TCircleContainer> = ({
  items,
  head,
  tail,
  showIndex = false,
}) => {
  const calculateCircleState = (ind: number) => {
    let circleState = ElementStates.Default;
    if (head !== undefined && tail !== undefined) {
      if (ind < head || ind > tail) {
        circleState = ElementStates.Modified;
      } else if (ind === head || ind === tail) {
        circleState = ElementStates.Changing;
      }
    }
    return circleState;
  };

  return (
    <>
      {items.map((el, ind) => (
        <Circle
          state={calculateCircleState(ind)}
          key={ind}
          index={showIndex ? ind : undefined}
          letter={el.toString()}
        />
      ))}
    </>
  );
};
