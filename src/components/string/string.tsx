import {
  FC,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import StringPageStyle from './string.module.css';
import { DELAY_IN_MS } from '../../constants/delays';
import { ReversableList } from '../../utils/ReversableList';
import { CircleContainer } from '../circle-container/circle-container';
import { ControlBox } from '../control-box/control-box';
import { ResultContainer } from '../result-container/result-container';

export const StringComponent: FC = () => {
  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [needRefreh, setNeedRefresh] = useState<boolean>(false);

  const reversableListRef = useRef(new ReversableList<string>([]));

  const processOnClick = useCallback(() => {
    setLoading(true);
    reversableListRef.current.changeInitialArr(str.split(''));
    setNeedRefresh(true);
    setStr('');
  }, [str]);

  useEffect(() => {
    setNeedRefresh(false);
    if (needRefreh) {
      console.log(
        reversableListRef.current.head,
        reversableListRef.current.tail
      );
      if (
        reversableListRef.current.head === undefined ||
        reversableListRef.current.tail === undefined
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
      <ControlBox>
        <Input
          maxLength={11}
          isLimitText={true}
          extraClass={StringPageStyle.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStr(e.target.value);
          }}
          value={str}
        ></Input>
        <Button
          text="Развернуть"
          onClick={processOnClick}
          isLoader={loading}
          disabled={str ? false : true}
        ></Button>
      </ControlBox>
      <ResultContainer extraClass={StringPageStyle.result__container}>
        <CircleContainer
          items={reversableListRef.current.currentArr}
          head={reversableListRef.current.head}
          tail={reversableListRef.current.tail}
        />
      </ResultContainer>
    </SolutionLayout>
  );
};
