import { FC, useCallback } from 'react';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { TLabel } from '../../types';
import { ArrowIcon } from '../ui/icons/arrow-icon';

type TCircleContainer = {
  items: Array<string | number | undefined>;
  modifiedElements?: Array<number>;
  inProgressElements?: Array<number>;
  headLabels?: Array<TLabel>;
  tailLabels?: Array<TLabel>;
  showIndex?: boolean;
  separateWithArrow?: boolean;
};

type TItem = {
  value: string;
  ind?: number;
  head?: string | JSX.Element;
  tail?: string | JSX.Element;
  separateWithArrow?: boolean;
  showIndex?: boolean;
  state?: ElementStates;
};

export const CircleContainer: FC<TCircleContainer> = ({
  items,
  modifiedElements,
  inProgressElements,
  headLabels,
  tailLabels,
  showIndex = false,
  separateWithArrow = false,
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
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall
          letter={el?.value}
        ></Circle>
      );
    else return undefined;
  };

  const calculateTail = (ind: number) => {
    const el = tailLabels?.find((el) => el.index === ind);
    if (el?.labelType === 'label') {
      return el.value;
    } else if (el?.labelType === 'circle')
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall
          letter={el?.value}
        ></Circle>
      );
    else return undefined;
  };

  return (
    <>
      {items.map((el, ind) => (
        <Item
          separateWithArrow={separateWithArrow}
          key={ind}
          ind={ind}
          showIndex={showIndex}
          value={el !== undefined ? el.toString() : ''}
          state={calculateCircleState(ind)}
          head={calculateHead(ind)}
          tail={calculateTail(ind)}
        ></Item>
      ))}
    </>
  );
};

const Item: FC<TItem> = ({
  separateWithArrow = false,
  showIndex = false,
  ind,
  state = ElementStates.Default,
  head,
  tail,
  value,
}) => {
  return (
    <>
      {separateWithArrow && ind !== 0 ? <ArrowIcon></ArrowIcon> : <></>}
      <Circle
        state={state}
        head={head}
        tail={tail}
        key={ind}
        index={showIndex ? ind : undefined}
        letter={value}
      />
    </>
  );
};
