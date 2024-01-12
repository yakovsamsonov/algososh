import { FC, ChangeEvent, useState, useRef, useCallback } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ControlBox } from '../control-box/control-box';
import { ControlGroup } from '../control-group/control-group';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ResultContainer } from '../result-container/result-container';
import { CircleContainer } from '../circle-container/circle-container';
import QueuePageStyle from './queue-page.module.css';
import { Queue } from '../../utils/Queue';
import { QUEUE_SIZE, DELAY_IN_MS, TAIL, HEAD } from '../../constants';
import { TLabel, Action } from '../../types';

export const QueuePage: FC = () => {
  const queueRef = useRef(new Queue<string>(QUEUE_SIZE));

  const [str, setStr] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<Action | undefined>();
  const [items, setItems] = useState<Array<string | undefined>>(
    queueRef.current.getListedValues()
  );
  const [inProgressElements, setInProgressElements] = useState<Array<number>>(
    []
  );

  const [isStackFull, setIsStackFull] = useState<boolean>(false);

  const processClearClick = useCallback(() => {
    queueRef.current.clear();
    setStr('');
    const items = queueRef.current.getListedValues();
    setItems([...items]);
  }, []);

  const processPushClick = useCallback(() => {
    setCurrentAction(Action.add);
    queueRef.current.enqueue(str);
    setStr('');
    const items = queueRef.current.getListedValues();
    setItems([...items]);
    setIsStackFull(queueRef.current.isFull());
    if (queueRef.current.tail !== null) {
      const tailIndex = queueRef.current.getTailIndex();
      setInProgressElements(tailIndex !== undefined ? [tailIndex] : []);
    }

    setTimeout(() => {
      setInProgressElements([]);
      setCurrentAction(undefined);
    }, DELAY_IN_MS);
  }, [str]);

  const processPopClick = useCallback(() => {
    setCurrentAction(Action.remove);
    setStr('');
    if (queueRef.current.head !== null) {
      const headIndex = queueRef.current.getHeadIndex();
      setInProgressElements(headIndex !== undefined ? [headIndex] : []);
    }

    setTimeout(() => {
      queueRef.current.dequeue();
      const items = queueRef.current.getListedValues();
      setItems([...items]);
      setIsStackFull(queueRef.current.isFull());
      setInProgressElements([]);
      setCurrentAction(undefined);
    }, DELAY_IN_MS);
  }, []);

  const getHeadLabels = useCallback(() => {
    const headIndex = queueRef.current.getHeadIndex();
    const headLabels: Array<TLabel> = [];
    if (headIndex !== undefined) {
      headLabels.push({
        index: headIndex,
        value: HEAD,
        labelType: 'label',
      });
    }
    return headLabels;
  }, []);

  const getTailLabels = useCallback(() => {
    const tailIndex = queueRef.current.getTailIndex();
    const tailLabels: Array<TLabel> = [];
    if (tailIndex !== undefined) {
      tailLabels.push({
        index: tailIndex,
        value: TAIL,
        labelType: 'label',
      });
    }
    return tailLabels;
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <ControlBox>
        <ControlGroup>
          <Input
            maxLength={4}
            isLimitText={true}
            extraClass={QueuePageStyle.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStr(e.target.value);
            }}
            value={str}
            placeholder="Введите значение"
          ></Input>
          <Button
            text="Добавить"
            onClick={processPushClick}
            disabled={
              !str ||
              (currentAction && currentAction !== Action.add) ||
              isStackFull
            }
            isLoader={currentAction === Action.add}
          ></Button>
          <Button
            text="Удалить"
            onClick={processPopClick}
            disabled={
              queueRef.current.length === 0 ||
              (currentAction && currentAction !== Action.remove)
            }
            isLoader={currentAction === Action.remove}
          ></Button>
        </ControlGroup>
        <Button
          text="Очистить"
          onClick={processClearClick}
          disabled={
            queueRef.current.length === 0 || currentAction !== undefined
          }
        ></Button>
      </ControlBox>
      <ResultContainer>
        <CircleContainer
          items={items}
          showIndex
          inProgressElements={inProgressElements}
          headLabels={getHeadLabels()}
          tailLabels={getTailLabels()}
        />
      </ResultContainer>
    </SolutionLayout>
  );
};
