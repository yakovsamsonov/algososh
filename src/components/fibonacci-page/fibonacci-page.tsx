import {
  FC,
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import FibonacciPageStyle from './fibonacci-page.module.css';
import { CircleContainer } from '../circle-container/circle-container';
import { FibonacciCalculator } from '../../utils/FibonacciCalc';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ControlBox } from '../control-box/control-box';
import { ControlGroup } from '../control-group/control-group';
import { ResultContainer } from '../result-container/result-container';

export const FibonacciPage: FC = () => {
  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [items, setItems] = useState<Array<number>>([]);
  const [curIndex, setCurIndex] = useState<number>();
  const [maxIndex, setMaxIndex] = useState<number>();

  const fibCalculator = useRef(new FibonacciCalculator());

  const processOnClick = useCallback(() => {
    setItems([]);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (loading && str) {
      setCurIndex(0);
      setMaxIndex(parseInt(str));
      setStr('');
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      if (
        curIndex !== undefined &&
        maxIndex !== undefined &&
        curIndex <= maxIndex
      ) {
        const fibonacci = fibCalculator.current.calculate(curIndex);
        setItems([...items, fibonacci]);
        setCurIndex(curIndex + 1);
      } else {
        setLoading(false);
      }
    }, SHORT_DELAY_IN_MS);
  }, [curIndex]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <ControlBox>
        <ControlGroup>
          <Input
            type={'number'}
            min={1}
            max={19}
            value={str}
            isLimitText={true}
            extraClass={FibonacciPageStyle.input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.checkValidity()) {
                setStr(e.target.value);
              }
            }}
          ></Input>
          <Button
            text="Рассчитать"
            onClick={processOnClick}
            isLoader={loading}
            disabled={str ? false : true}
          ></Button>
        </ControlGroup>
      </ControlBox>
      <ResultContainer extraClass={FibonacciPageStyle.result__container}>
        <CircleContainer items={items} showIndex />
      </ResultContainer>
    </SolutionLayout>
  );
};
