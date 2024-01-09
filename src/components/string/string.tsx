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
import { ReversableList } from '../../utils/reversable-list/ReversableList';
import { CircleContainer } from '../circle-container/circle-container';
import { ControlBox } from '../control-box/control-box';
import { ControlGroup } from '../control-group/control-group';
import { ResultContainer } from '../result-container/result-container';

export const StringComponent: FC = () => {
  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modifiedElements, setModifiedElements] = useState<Array<number>>([]);
  const [inProgressElements, setInProgressElements] = useState<Array<number>>(
    []
  );

  const reversableListRef = useRef(new ReversableList<string>([]));

  const recalculateState = useCallback((revList: ReversableList<string>) => {
    setInProgressElements(revList.getCurrentPointers());
    setModifiedElements(revList.getCompletedPointers());
    setLoading(revList.hasIncompleteSteps);
  }, []);

  const processOnClick = useCallback(() => {
    const revList = reversableListRef.current;
    revList.changeInitialArr(str.split(''));
    recalculateState(revList);
    setStr('');
  }, [str, recalculateState]);

  useEffect(() => {
    if (loading) {
      const revList = reversableListRef.current;
      setTimeout(() => {
        revList.doNextStep();
        recalculateState(revList);
      }, DELAY_IN_MS);
    }
  }, [inProgressElements]);

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
            data-test-id="button-string"
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
