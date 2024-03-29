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
  const [inProgressElements, setInProgressElements] = useState<Array<number>>(
    []
  );
  const [curIndex, setCurIndex] = useState<number>();
  const [maxIndex, setMaxIndex] = useState<number>();

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
    setCurrentAction(Action.addToIndex);
    const currentInd = parseInt(ind);
    setCurIndex(0);
    setMaxIndex(currentInd);
    setInProgressElements([0]);
    setInd('');
  }, [ind]);

  const removeFromIndex = useCallback(() => {
    setCurrentAction(Action.removeFromIndex);
    const currentInd = parseInt(ind);
    setCurIndex(0);
    setMaxIndex(currentInd);
    setInProgressElements([0]);
    setInd('');
  }, [ind]);

  useEffect(() => {
    if (modifiedElements.length > 0) {
      setTimeout(() => {
        setModifiedElements([]);
        setCurrentAction(undefined);
      }, DELAY_IN_MS);
    }
  }, [modifiedElements]);

  useEffect(() => {
    if (
      curIndex !== undefined &&
      maxIndex !== undefined &&
      curIndex < maxIndex
    ) {
      setTimeout(() => {
        setInProgressElements(inProgressElements.concat(curIndex + 1));
        setCurIndex(curIndex + 1);
      }, DELAY_IN_MS);
    } else if (maxIndex !== undefined && curIndex === maxIndex) {
      setStr('');
      if (currentAction === Action.addToIndex) {
        setHeadLabels([
          {
            index: maxIndex,
            value: str,
            labelType: 'circle',
          },
          {
            index: 0,
            value: HEAD,
            labelType: 'label',
          },
        ]);
      } else if (currentAction === Action.removeFromIndex) {
        const removedValue = listRef.current.clearValueAt(maxIndex);
        setItems([...listRef.current.getListedValues()]);
        if (removedValue) {
          setTailLabels([
            {
              index: maxIndex,
              value: removedValue,
              labelType: 'circle',
            },
            {
              index: listRef.current.getSize() - 1,
              value: TAIL,
              labelType: 'label',
            },
          ]);
        }
      }
      setTimeout(() => {
        if (currentAction === Action.addToIndex) {
          if (str) {
            listRef.current.insertAt(str, maxIndex);
          }
          setHeadLabels([
            {
              index: 0,
              value: HEAD,
              labelType: 'label',
            },
          ]);
          setModifiedElements([maxIndex]);
        } else if (currentAction === Action.removeFromIndex) {
          listRef.current.removeAt(maxIndex);
          setCurrentAction(undefined);
        }
        setItems([...listRef.current.getListedValues()]);
        setTailLabels([
          {
            index: listRef.current.getSize() - 1,
            value: TAIL,
            labelType: 'label',
          },
        ]);
        setCurIndex(undefined);
        setMaxIndex(undefined);
        setInProgressElements([]);
      }, DELAY_IN_MS);
    }
  }, [curIndex]);

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
            placeholder="Введите значение"
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
            placeholder="Введите индекс"
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
          inProgressElements={inProgressElements}
          modifiedElements={modifiedElements}
        ></CircleContainer>
      </ResultContainer>
    </SolutionLayout>
  );
};
