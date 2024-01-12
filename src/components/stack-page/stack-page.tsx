import { FC, ChangeEvent, useState, useCallback, useRef } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ControlBox } from '../control-box/control-box';
import { ResultContainer } from '../result-container/result-container';
import { CircleContainer } from '../circle-container/circle-container';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import StackPageStyle from './stack-page.module.css';
import { ControlGroup } from '../control-group/control-group';
import { Stack } from '../../utils/Stack';
import { DELAY_IN_MS } from '../../constants/delays';
import { Action } from '../../types/action';

export const StackPage: FC = () => {
  const [str, setStr] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<Action | undefined>();
  const [items, setItems] = useState<Array<string>>([]);
  const [inProgressElements, setInProgressElements] = useState<Array<number>>(
    []
  );

  const stackRef = useRef(new Stack<string>());

  const processClearClick = useCallback(() => {
    stackRef.current.clear();
    setStr('');
    const items = stackRef.current.getListedValues();
    setItems(items);
    setInProgressElements([]);
  }, []);

  const processPushClick = useCallback(() => {
    setCurrentAction(Action.add);
    stackRef.current.push(str);
    setStr('');
    const items = stackRef.current.getListedValues();
    setItems(items);
    setInProgressElements([items.length - 1]);
    setTimeout(() => {
      setInProgressElements([]);
      setCurrentAction(undefined);
    }, DELAY_IN_MS);
  }, [str]);

  const processPopClick = useCallback(() => {
    setCurrentAction(Action.remove);
    setStr('');
    setInProgressElements([items.length - 1]);
    setTimeout(() => {
      stackRef.current.pop();
      const items = stackRef.current.getListedValues();
      setItems(items);
      setInProgressElements([]);
      setCurrentAction(undefined);
    }, DELAY_IN_MS);
  }, [items.length]);

  return (
    <SolutionLayout title="Стек">
      <ControlBox>
        <ControlGroup>
          <Input
            maxLength={4}
            isLimitText={true}
            extraClass={StackPageStyle.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStr(e.target.value);
            }}
            value={str}
          ></Input>
          <Button
            text="Добавить"
            onClick={processPushClick}
            disabled={!str || (currentAction && currentAction !== Action.add)}
            isLoader={currentAction === Action.add}
          ></Button>
          <Button
            text="Удалить"
            onClick={processPopClick}
            disabled={
              stackRef.current.head === null ||
              (currentAction && currentAction !== Action.remove)
            }
            isLoader={currentAction === Action.remove}
          ></Button>
        </ControlGroup>
        <Button
          text="Очистить"
          onClick={processClearClick}
          disabled={
            stackRef.current.head === null || currentAction !== undefined
          }
        ></Button>
      </ControlBox>
      <ResultContainer>
        <CircleContainer
          items={items}
          showIndex
          inProgressElements={inProgressElements}
        />
      </ResultContainer>
    </SolutionLayout>
  );
};
