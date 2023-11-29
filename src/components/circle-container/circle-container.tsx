import { FC } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import CircleContainerStyle from './circle-container.module.css';

type TCircleContainer = {
  items: Array<string | number>;
  head?: number | null;
  tail?: number | null;
  showIndex?: boolean;
  extraClass?: string;
};

export const CircleContainer: FC<TCircleContainer> = ({
  items,
  head = null,
  tail = null,
  showIndex = false,
  extraClass,
}) => {
  const calculateCircleState = (ind: number) => {
    let circleState = ElementStates.Default;
    if (head !== null && tail !== null) {
      if (ind < head || ind > tail) {
        circleState = ElementStates.Modified;
      } else if (ind === head || ind === tail) {
        circleState = ElementStates.Changing;
      }
    }
    return circleState;
  };

  return (
    <div className={`${CircleContainerStyle.circle__container} ${extraClass}`}>
      {items.map((el, ind) => (
        <Circle
          state={calculateCircleState(ind)}
          key={ind}
          tail={showIndex ? ind.toString() : null}
          letter={el.toString()}
        />
      ))}
    </div>
  );
};
