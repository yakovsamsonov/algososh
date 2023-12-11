import { FC, useCallback } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { TAIL, TOP } from '../../constants';

type TLabel = {
  index: number;
  labelType: 'label' | 'circle';
  value: string;
};

type TCircleContainer = {
  items: Array<string | number | null>;
  modifiedElements?: Array<number>;
  inProgressElements?: Array<number>;
  headLabels?: Array<TLabel>;
  tailLabels?: Array<TLabel>;
  showIndex?: boolean;
};

export const CircleContainer: FC<TCircleContainer> = ({
  items,
  modifiedElements,
  inProgressElements,
  headLabels,
  tailLabels,
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
    const el = headLabels?.find((el) => el.index === ind);
    if (el?.labelType === 'label') {
      return el.value;
    } else if (el?.labelType === 'circle')
      return <Circle isSmall letter={el?.value}></Circle>;
    else return undefined;
  };

  const calculateTail = (ind: number) => {
    const el = tailLabels?.find((el) => el.index === ind);
    if (el?.labelType === 'label') {
      return el.value;
    } else if (el?.labelType === 'circle')
      return <Circle isSmall letter={el?.value}></Circle>;
    else return undefined;
  };

  return (
    <>
      {items.map((el, ind) => (
        <Circle
          state={calculateCircleState(ind)}
          head={calculateHead(ind)}
          tail={calculateTail(ind)}
          key={ind}
          index={showIndex ? ind : undefined}
          letter={el !== null ? el.toString() : ''}
        />
      ))}
    </>
  );
};
