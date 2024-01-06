import {
  useCallback,
  FC,
  useState,
  useRef,
  ChangeEvent,
  MouseEventHandler,
  useEffect,
} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ControlBox } from '../control-box/control-box';
import { ControlGroup } from '../control-group/control-group';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { ResultContainer } from '../result-container/result-container';
import { ColumnContainer } from '../column-container/column-container';
import { generateArray } from '../../utils/generateArray';
import SortingPageStyle from './sorting-page.module.css';
import { DELAY_IN_MS } from '../../constants/delays';
import { SortingMode } from '../../types';
import { ArraySorter } from '../../utils/array-sorter/ArraySorter';

export const SortingPage: FC = () => {
  const arraySorterRef = useRef(new ArraySorter<number>());

  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<SortingMode>(SortingMode.Selection);
  const [orderDir, setOrderDir] = useState<Direction>();
  const [items, setItems] = useState<Array<number>>([]);
  const [modifiedElements, setModifiedElements] = useState<Array<number>>([]);
  const [inProgressElements, setInProgressElements] = useState<Array<number>>(
    []
  );

  const generateNewArray = useCallback(() => {
    const newArr = generateArray(0, 100, 3, 17);
    arraySorterRef.current.setItems(newArr);
    setItems(newArr);
    setInProgressElements(arraySorterRef.current.getCurrentPointers());
    setModifiedElements(arraySorterRef.current.getCompletedPointers());
  }, []);

  const recalculateState = useCallback((arr: ArraySorter<number>) => {
    setInProgressElements(arr.getCurrentPointers());
    setModifiedElements(arr.getCompletedPointers());
    setLoading(arr.hasIncompleteSteps);
    if (!arr.hasIncompleteSteps) {
      setOrderDir(undefined);
    }
  }, []);

  const processOnClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (evt) => {
      const requestedDirection = (evt.target as Element).closest('button')
        ?.name as Direction;
      setOrderDir(requestedDirection);
      arraySorterRef.current.prepareSorter(mode, requestedDirection);
      recalculateState(arraySorterRef.current);
    },
    [mode, recalculateState]
  );

  const changeMode = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as SortingMode);
  }, []);

  useEffect(() => {
    if (loading) {
      const arr = arraySorterRef.current;
      setTimeout(() => {
        arr.doOneSortingStep();
        recalculateState(arr);
      }, DELAY_IN_MS);
    }
  }, [inProgressElements]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  return (
    <SolutionLayout title="Сортировка массива">
      <ControlBox extraClass={SortingPageStyle.control__container}>
        <ControlGroup extraClass={`${SortingPageStyle.control__group_radio}`}>
          <RadioInput
            name={'mode'}
            value={SortingMode.Selection}
            label={'Выбор'}
            checked={mode === SortingMode.Selection}
            disabled={loading}
            onChange={changeMode}
          ></RadioInput>
          <RadioInput
            name={'mode'}
            value={SortingMode.Bubble}
            label={'Пузырек'}
            checked={mode === SortingMode.Bubble}
            disabled={loading}
            onChange={changeMode}
          ></RadioInput>
        </ControlGroup>
        <ControlGroup>
          <Button
            name={Direction.Ascending}
            sorting={Direction.Ascending}
            text="По возрастанию"
            disabled={loading || !arraySorterRef.current.items}
            isLoader={orderDir === Direction.Ascending}
            onClick={processOnClick}
            extraClass={SortingPageStyle.control__button}
          ></Button>
          <Button
            name={Direction.Descending}
            sorting={Direction.Descending}
            text="По убыванию"
            disabled={loading || !arraySorterRef.current.items}
            isLoader={orderDir === Direction.Descending}
            onClick={processOnClick}
            extraClass={SortingPageStyle.control__button}
          ></Button>
        </ControlGroup>
        <Button
          text="Новый массив"
          onClick={generateNewArray}
          disabled={loading}
        ></Button>
      </ControlBox>
      <ResultContainer extraClass={SortingPageStyle.result__container}>
        <ColumnContainer
          items={items}
          modifiedElements={modifiedElements}
          inProgressElements={inProgressElements}
        ></ColumnContainer>
      </ResultContainer>
    </SolutionLayout>
  );
};
