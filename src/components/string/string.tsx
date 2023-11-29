import { FC, useState, ChangeEvent, useRef, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import StringPageStyle from './string.module.css';
import { Circle } from '../ui/circle/circle';
import { DELAY_IN_MS } from '../../constants/delays';
import { ReversableList } from '../../utils/revertOrder';
import { ElementStates } from '../../types/element-states';

type TCircleContainer = {
  items: Array<string>;
  head: number | null;
  tail: number | null;
};

export const StringComponent: FC = () => {
  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [needRefreh, setNeedRefresh] = useState<boolean>(false);

  const reversableListRef = useRef(new ReversableList([]));

  const doMagic = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      reversableListRef.current.changeInitialArr(str.split(''));
      setNeedRefresh(true);
      setStr('');
    }
  }, [loading]);

  useEffect(() => {
    setNeedRefresh(false);
    if (needRefreh) {
      if (
        reversableListRef.current.head === null ||
        reversableListRef.current.tail === null
      ) {
        setTimeout(() => {
          reversableListRef.current.initCounters();
          setNeedRefresh(true);
        }, DELAY_IN_MS);
      } else if (
        reversableListRef.current.head <= reversableListRef.current.tail
      ) {
        setTimeout(() => {
          reversableListRef.current.swap();
          setNeedRefresh(true);
        }, DELAY_IN_MS);
      } else {
        setLoading(false);
      }
    }
  }, [needRefreh]);

  return (
    <SolutionLayout title="Строка">
      <div className={StringPageStyle.container}>
        <Input
          maxLength={11}
          isLimitText={true}
          extraClass={StringPageStyle.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStr(e.target.value);
          }}
          value={str}
        ></Input>
        <Button text="Развернуть" onClick={doMagic} isLoader={loading}></Button>
      </div>
      <CircleContainer
        items={reversableListRef.current.currentArr}
        head={reversableListRef.current.head}
        tail={reversableListRef.current.tail}
      />
    </SolutionLayout>
  );
};

const CircleContainer: FC<TCircleContainer> = ({ items, head, tail }) => {
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
    <div className={StringPageStyle.letter__container}>
      {items.map((el, ind) => (
        <Circle state={calculateCircleState(ind)} key={ind} letter={el} />
      ))}
    </div>
  );
};
