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

export const StackPage: FC = () => {
  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
    setInProgressElements([items.length - 1]);
  }, []);

  const processPushClick = useCallback(() => {
    setLoading(true);
    stackRef.current.push(str);
    setStr('');
    const items = stackRef.current.getListedValues();
    setItems(items);
    setInProgressElements([items.length - 1]);
    setTimeout(() => {
      setInProgressElements([]);
      setLoading(false);
    }, DELAY_IN_MS);
  }, [str]);

  const processPopClick = useCallback(() => {
    setLoading(true);
    setStr('');
    const items = stackRef.current.getListedValues();
    setInProgressElements([items.length - 1]);
    setTimeout(() => {
      stackRef.current.pop();
      const items = stackRef.current.getListedValues();
      setItems(items);
      setInProgressElements([]);
      setLoading(false);
    }, DELAY_IN_MS);
  }, []);

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
            disabled={str || !loading ? false : true}
          ></Button>
          <Button
            text="Удалить"
            onClick={processPopClick}
            disabled={stackRef.current.head === null || loading}
          ></Button>
        </ControlGroup>
        <Button
          text="Очистить"
          onClick={processClearClick}
          disabled={stackRef.current.head === null || loading}
        ></Button>
      </ControlBox>
      <ResultContainer extraClass={StackPageStyle.result__container}>
        <CircleContainer
          items={items}
          showIndex
          inProgressElements={inProgressElements}
        />
      </ResultContainer>
    </SolutionLayout>
  );
};
