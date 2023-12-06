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
import { ControlGroup } from '../control-group/control-group';
import { ResultContainer } from '../result-container/result-container';

export const StringComponent: FC = () => {
  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [needRefreh, setNeedRefresh] = useState<boolean>(false);
  const [modifiedElements, setModifiedElements] = useState<Array<number>>([]);
  const [inProgressElements, setInProgressElements] = useState<Array<number>>(
    []
  );

  const reversableListRef = useRef(new ReversableList<string>([]));

  const processOnClick = useCallback(() => {
    setLoading(true);
    reversableListRef.current.changeInitialArr(str.split(''));
    setInProgressElements([]);
    setModifiedElements(calculateModifiedElements());
    setNeedRefresh(true);
    setStr('');
  }, [str]);

  const calculateInProgressElements = useCallback(() => {
    const inProgress = [];
    if (reversableListRef.current.head !== undefined) {
      inProgress.push(reversableListRef.current.head);
    }
    if (reversableListRef.current.tail !== undefined) {
      inProgress.push(reversableListRef.current.tail);
    }
    return inProgress;
  }, []);

  const calculateModifiedElements = useCallback(() => {
    const modified = [];
    if (
      reversableListRef.current.head !== undefined &&
      reversableListRef.current.tail !== undefined
    ) {
      for (let i = 0; i < reversableListRef.current.currentArr.length; i++) {
        if (
          i < reversableListRef.current.head ||
          i > reversableListRef.current.tail
        ) {
          modified.push(i);
        }
      }
    }
    return modified;
  }, []);

  useEffect(() => {
    setNeedRefresh(false);
    if (needRefreh) {
      if (
        reversableListRef.current.head === undefined ||
        reversableListRef.current.tail === undefined
      ) {
        setTimeout(() => {
          reversableListRef.current.initCounters();
          setInProgressElements(calculateInProgressElements());
          setModifiedElements(calculateModifiedElements());
          setNeedRefresh(true);
        }, DELAY_IN_MS);
      } else if (
        reversableListRef.current.head <= reversableListRef.current.tail
      ) {
        setTimeout(() => {
          reversableListRef.current.swap();
          setInProgressElements(calculateInProgressElements());
          setModifiedElements(calculateModifiedElements());
          setNeedRefresh(true);
        }, DELAY_IN_MS);
      } else {
        setInProgressElements([]);
        setModifiedElements(calculateModifiedElements());
        setLoading(false);
      }
    }
  }, [needRefreh]);

  return (
    <SolutionLayout title="Строка">
      <ControlBox>
        <ControlGroup>
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
        </ControlGroup>
      </ControlBox>
      <ResultContainer extraClass={StringPageStyle.result__container}>
        <CircleContainer
          items={reversableListRef.current.currentArr}
          inProgressElements={inProgressElements}
          modifiedElements={modifiedElements}
        />
      </ResultContainer>
    </SolutionLayout>
  );
};
