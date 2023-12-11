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

export const QueuePage: FC = () => {
  const queueRef = useRef(new Queue<string>(QUEUE_SIZE));

  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Array<string | null>>(
    queueRef.current.getListedValues()
  );
  const [inProgressElements, setInProgressElements] = useState<Array<number>>(
    []
  );

  const processClearClick = useCallback(() => {
    queueRef.current.clear();
    setStr('');
    const items = queueRef.current.getListedValues();
    setItems([...items]);
  }, []);

  const processPushClick = useCallback(() => {
    setLoading(true);
    queueRef.current.enqueue(str);
    setStr('');
    const items = queueRef.current.getListedValues();
    setItems([...items]);
    if (queueRef.current.tail !== null) {
      const tailIndex = queueRef.current.getTailIndex();
      setInProgressElements(tailIndex !== undefined ? [tailIndex] : []);
    }

    setTimeout(() => {
      setInProgressElements([]);
      setLoading(false);
    }, DELAY_IN_MS);
  }, [str]);

  const processPopClick = useCallback(() => {
    setLoading(true);
    setStr('');
    if (queueRef.current.head !== null) {
      const headIndex = queueRef.current.getHeadIndex();
      setInProgressElements(headIndex !== undefined ? [headIndex] : []);
    }

    setTimeout(() => {
      queueRef.current.dequeue();
      const items = queueRef.current.getListedValues();
      setItems([...items]);
      setInProgressElements([]);
      setLoading(false);
    }, DELAY_IN_MS);
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
          ></Input>
          <Button
            text="Добавить"
            onClick={processPushClick}
            disabled={!str || loading}
          ></Button>
          <Button
            text="Удалить"
            onClick={processPopClick}
            disabled={queueRef.current.length === 0 || loading}
          ></Button>
        </ControlGroup>
        <Button
          text="Очистить"
          onClick={processClearClick}
          disabled={queueRef.current.length === 0 || loading}
        ></Button>
      </ControlBox>
      <ResultContainer>
        <CircleContainer
          items={items}
          showIndex
          inProgressElements={inProgressElements}
          headLabels={
            queueRef.current.head !== null
              ? [
                  {
                    index: queueRef.current.head,
                    value: HEAD,
                    labelType: 'label',
                  },
                ]
              : []
          }
          tailLabels={
            queueRef.current.tail !== null
              ? [
                  {
                    index: queueRef.current.tail,
                    value: TAIL,
                    labelType: 'label',
                  },
                ]
              : []
          }
        />
      </ResultContainer>
    </SolutionLayout>
  );
};
