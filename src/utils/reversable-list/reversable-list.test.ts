import { ReversableList } from './ReversableList';

describe('Разворот строки', () => {
  let revList: ReversableList<string>;
  beforeAll(() => {
    revList = new ReversableList<string>([]);
  });

  it('инициация массива', () => {
    revList.changeInitialArr(['a', 'b']);

    expect(revList.currentArr.length).toBe(2);
    expect(revList.head).toBe(0);
    expect(revList.tail).toBe(1);
    expect(revList.hasIncompleteSteps).toBe(true);
  });

  it('один шаг', () => {
    revList.changeInitialArr(['a', 'b', 'c']);

    expect(revList.currentArr.length).toBe(3);
    expect(revList.head).toBe(0);
    expect(revList.tail).toBe(2);
    expect(revList.getCurrentPointers()).toEqual([0, 2]);
    expect(revList.getCompletedPointers()).toEqual([]);
    expect(revList.hasIncompleteSteps).toBe(true);

    revList.doNextStep();

    expect(revList.head).toBe(1);
    expect(revList.tail).toBe(1);
    expect(revList.getCurrentPointers()).toEqual([1, 1]);
    expect(revList.getCompletedPointers()).toEqual([0, 2]);
    expect(revList.hasIncompleteSteps).toBe(true);

    revList.doNextStep();

    expect(revList.head).toBe(2);
    expect(revList.tail).toBe(0);
    expect(revList.getCurrentPointers()).toEqual([]);
    expect(revList.getCompletedPointers()).toEqual([0, 1, 2]);
    expect(revList.hasIncompleteSteps).toBe(false);
  });

  it('с четным количеством символов', () => {
    revList.changeInitialArr(['1', '2', '3', '4']);
    revList.swap();

    expect(revList.currentArr).toEqual(['4', '3', '2', '1']);
  });

  it('с нечетным количеством символов', () => {
    revList.changeInitialArr(['1', '2', '3', '4', '5']);
    revList.swap();

    expect(revList.currentArr).toEqual(['5', '4', '3', '2', '1']);
  });

  it('с одним символов', () => {
    revList.changeInitialArr(['5']);
    revList.swap();

    expect(revList.currentArr).toEqual(['5']);
  });

  it('пустая строка', () => {
    revList.changeInitialArr([]);
    revList.swap();

    expect(revList.currentArr).toEqual([]);
  });
});
