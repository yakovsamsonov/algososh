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

export const FibonacciPage: FC = () => {
  const [str, setStr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [items, setItems] = useState<Array<number>>([]);
  const [curIndex, setCurIndex] = useState<number | null>(null);
  const [maxIndex, setMaxIndex] = useState<number | null>(null);

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
      if (curIndex !== null && maxIndex !== null && curIndex <= maxIndex) {
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
      <div className={FibonacciPageStyle.container}>
        <Input
          type={'number'}
          min={1}
          max={19}
          value={str}
          isLimitText={true}
          extraClass={FibonacciPageStyle.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStr(e.target.value);
          }}
        ></Input>
        <Button
          text="Рассчитать"
          onClick={processOnClick}
          isLoader={loading}
          disabled={str ? false : true}
        ></Button>
      </div>
      <CircleContainer
        items={items}
        showIndex
        extraClass={FibonacciPageStyle.result__container}
      />
    </SolutionLayout>
  );
};
