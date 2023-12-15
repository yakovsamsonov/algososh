import {
  FC,
  useState,
  ChangeEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { CircleContainer } from '../circle-container/circle-container';
import { ResultContainer } from '../result-container/result-container';
import ListPageStyle from './list-page.module.css';
import { ControlBox } from '../control-box/control-box';
import { ControlGroup } from '../control-group/control-group';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { LinkedList } from '../../utils/LinkedList';
import { HEAD, TAIL } from '../../constants';
import { TLabel } from '../../types';
import { DELAY_IN_MS } from '../../constants';
import { Action } from '../../types/action';

export const ListPage: FC = () => {
  const listRef = useRef(new LinkedList(['4', '6', '7', '15']));

  const [str, setStr] = useState<string>('');
  const [ind, setInd] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<Action | undefined>();
  const [items, setItems] = useState<Array<string | undefined>>(
    listRef.current.getListedValues()
  );
  const [headLabels, setHeadLabels] = useState<Array<TLabel>>([
    {
      index: 0,
      value: HEAD,
      labelType: 'label',
    },
  ]);
  const [tailLabels, setTailLabels] = useState<Array<TLabel>>([
    {
      index: listRef.current.getSize() - 1,
      value: TAIL,
      labelType: 'label',
    },
  ]);
  const [modifiedElements, setModifiedElements] = useState<Array<number>>([]);

  const addToHead = useCallback(() => {
    setCurrentAction(Action.addToHead);
    setHeadLabels([
      {
        index: 0,
        value: str,
        labelType: 'circle',
      },
    ]);
    setStr('');

    setTimeout(() => {
      if (str) {
        listRef.current.prepend(str);
      }
      setHeadLabels([
        {
          index: 0,
          value: HEAD,
          labelType: 'label',
        },
      ]);
      setItems([...listRef.current.getListedValues()]);
      setModifiedElements([0]);
      setCurrentAction(undefined);
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: TAIL,
          labelType: 'label',
        },
      ]);
    }, DELAY_IN_MS);
  }, [str]);

  const removeFromHead = useCallback(() => {
    setCurrentAction(Action.removeFromHead);
    setStr('');
    const removedValue = listRef.current.clearValueAt(0);
    setItems([...listRef.current.getListedValues()]);
    if (removedValue) {
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: TAIL,
          labelType: 'label',
        },
        {
          index: 0,
          value: removedValue,
          labelType: 'circle',
        },
      ]);
    }

    setTimeout(() => {
      listRef.current.removeAt(0);
      setItems([...listRef.current.getListedValues()]);
      setCurrentAction(undefined);
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: TAIL,
          labelType: 'label',
        },
      ]);
    }, DELAY_IN_MS);
  }, []);

  const addToTail = useCallback(() => {
    setCurrentAction(Action.addToTail);
    setStr('');
    setHeadLabels([
      {
        index: listRef.current.getSize() - 1,
        value: str,
        labelType: 'circle',
      },
      {
        index: 0,
        value: HEAD,
        labelType: 'label',
      },
    ]);

    setTimeout(() => {
      if (str) {
        listRef.current.append(str);
        setHeadLabels([
          {
            index: 0,
            value: HEAD,
            labelType: 'label',
          },
        ]);
        setItems([...listRef.current.getListedValues()]);
        setModifiedElements([listRef.current.getSize() - 1]);
        setCurrentAction(undefined);
        setTailLabels([
          {
            index: listRef.current.getSize() - 1,
            value: TAIL,
            labelType: 'label',
          },
        ]);
      }
    }, DELAY_IN_MS);
  }, [str]);

  const removeFromTail = useCallback(() => {
    setCurrentAction(Action.removeFromTail);
    setStr('');
    const removedValue = listRef.current.clearValueAt(
      listRef.current.getSize() - 1
    );
    setItems([...listRef.current.getListedValues()]);
    if (removedValue) {
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: removedValue,
          labelType: 'circle',
        },
      ]);
    }

    setTimeout(() => {
      listRef.current.removeAt(listRef.current.getSize() - 1);
      setItems([...listRef.current.getListedValues()]);
      setCurrentAction(undefined);
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: TAIL,
          labelType: 'label',
        },
      ]);
    }, DELAY_IN_MS);
  }, []);

  const addToIndex = useCallback(() => {
    const currentInd = parseInt(ind);
    setCurrentAction(Action.addToIndex);
    setHeadLabels([
      {
        index: currentInd,
        value: str,
        labelType: 'circle',
      },
      {
        index: 0,
        value: HEAD,
        labelType: 'label',
      },
    ]);
    setStr('');
    setInd('');

    setTimeout(() => {
      if (str && ind) {
        listRef.current.insertAt(str, currentInd);
      }
      setHeadLabels([
        {
          index: 0,
          value: HEAD,
          labelType: 'label',
        },
      ]);
      setItems([...listRef.current.getListedValues()]);
      setModifiedElements([currentInd]);
      setCurrentAction(undefined);
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: TAIL,
          labelType: 'label',
        },
      ]);
    }, DELAY_IN_MS);
  }, [str, ind]);

  const removeFromIndex = useCallback(() => {
    setCurrentAction(Action.removeFromIndex);
    const currentInd = parseInt(ind);
    setStr('');
    setInd('');
    const removedValue = listRef.current.clearValueAt(currentInd);
    setItems([...listRef.current.getListedValues()]);
    if (removedValue) {
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: TAIL,
          labelType: 'label',
        },
        {
          index: currentInd,
          value: removedValue,
          labelType: 'circle',
        },
      ]);
    }

    setTimeout(() => {
      listRef.current.removeAt(currentInd);
      setItems([...listRef.current.getListedValues()]);
      setCurrentAction(undefined);
      setTailLabels([
        {
          index: listRef.current.getSize() - 1,
          value: TAIL,
          labelType: 'label',
        },
      ]);
    }, DELAY_IN_MS);
  }, [ind]);

  useEffect(() => {
    if (!currentAction) {
      setTimeout(() => {
        setModifiedElements([]);
      }, DELAY_IN_MS);
    }
  }, [currentAction]);

  return (
    <SolutionLayout title="Связный список">
      <ControlBox>
        <ControlGroup>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStr(e.target.value);
            }}
            value={str}
            extraClass={ListPageStyle.input}
          ></Input>
          <Button
            text="Добавить в head"
            extraClass={ListPageStyle.button_medium}
            onClick={addToHead}
            disabled={!str}
            isLoader={currentAction === Action.addToHead}
          ></Button>
          <Button
            text="Добавить в tail"
            extraClass={ListPageStyle.button_medium}
            onClick={addToTail}
            disabled={!str}
            isLoader={currentAction === Action.addToTail}
          ></Button>
          <Button
            text="Удалить из head"
            extraClass={ListPageStyle.button_medium}
            onClick={removeFromHead}
            disabled={
              items.length === 0 ||
              (currentAction && currentAction !== Action.removeFromHead)
            }
            isLoader={currentAction === Action.removeFromHead}
          ></Button>
          <Button
            text="Удалить из tail"
            extraClass={ListPageStyle.button_medium}
            onClick={removeFromTail}
            disabled={
              items.length === 0 ||
              (currentAction && currentAction !== Action.removeFromTail)
            }
            isLoader={currentAction === Action.removeFromTail}
          ></Button>
        </ControlGroup>
        <ControlGroup>
          <Input
            type={'number'}
            min={0}
            max={items.length - 1}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.checkValidity()) {
                setInd(e.target.value);
              }
            }}
            value={ind}
            extraClass={ListPageStyle.input}
          ></Input>
          <Button
            text="Добавить по индексу"
            extraClass={ListPageStyle.button_large}
            onClick={addToIndex}
            disabled={!ind || !str}
            isLoader={currentAction === Action.addToIndex}
          ></Button>
          <Button
            text="Удалить по индексу"
            extraClass={ListPageStyle.button_large}
            onClick={removeFromIndex}
            disabled={!ind}
            isLoader={currentAction === Action.removeFromIndex}
          ></Button>
        </ControlGroup>
      </ControlBox>
      <ResultContainer extraClass={ListPageStyle.result__container}>
        <CircleContainer
          items={items}
          separateWithArrow
          headLabels={headLabels}
          tailLabels={tailLabels}
          modifiedElements={modifiedElements}
        ></CircleContainer>
      </ResultContainer>
    </SolutionLayout>
  );
};
