import { ArraySorter } from './ArraySorter';
import { Direction, SortingMode } from '../../types';

describe('Сортировка массива', () => {
  let sorter: ArraySorter<number>;

  beforeEach(() => {
    sorter = new ArraySorter();
    sorter.setItems([92, 6, 48]);
  });

  it('задание массива', () => {
    expect(sorter.items?.length).toBe(3);
    expect(sorter.hasIncompleteSteps).toBe(false);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(undefined);
    expect(sorter.mode).toBe(SortingMode.Selection);
    expect(sorter.direction).toBe(Direction.Ascending);
  });

  it('установка способа сортировки', () => {
    sorter.prepareSorter(SortingMode.Bubble, Direction.Descending);

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(1);
    expect(sorter.mode).toBe(SortingMode.Bubble);
    expect(sorter.direction).toBe(Direction.Descending);
    expect(sorter.items).toEqual([92, 6, 48]);
  });

  it('один шаг пузырьком по возрастанию', () => {
    sorter.prepareSorter(SortingMode.Bubble, Direction.Ascending);

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(1);
    expect(sorter.mode).toBe(SortingMode.Bubble);
    expect(sorter.direction).toBe(Direction.Ascending);
    expect(sorter.items).toEqual([92, 6, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(2);
    expect(sorter.items).toEqual([6, 92, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(1);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(1);
    expect(sorter.items).toEqual([6, 48, 92]);
  });

  it('один шаг пузырьком по убыванию', () => {
    sorter.prepareSorter(SortingMode.Bubble, Direction.Descending);

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(1);
    expect(sorter.mode).toBe(SortingMode.Bubble);
    expect(sorter.direction).toBe(Direction.Descending);
    expect(sorter.items).toEqual([92, 6, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(2);
    expect(sorter.items).toEqual([92, 6, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(1);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(1);
    expect(sorter.items).toEqual([92, 48, 6]);
  });

  it('один шаг выбором по возрастанию', () => {
    sorter.prepareSorter(SortingMode.Selection, Direction.Ascending);

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(1);
    expect(sorter.mode).toBe(SortingMode.Selection);
    expect(sorter.direction).toBe(Direction.Ascending);
    expect(sorter.items).toEqual([92, 6, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(1);
    expect(sorter.nextInd).toBe(2);
    expect(sorter.items).toEqual([92, 6, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(1);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(2);
    expect(sorter.items).toEqual([6, 92, 48]);
  });

  it('один шаг выбором по убыванию', () => {
    sorter.prepareSorter(SortingMode.Selection, Direction.Descending);

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(1);
    expect(sorter.mode).toBe(SortingMode.Selection);
    expect(sorter.direction).toBe(Direction.Descending);
    expect(sorter.items).toEqual([92, 6, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(0);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(2);
    expect(sorter.items).toEqual([92, 6, 48]);

    sorter.doOneSortingStep();

    expect(sorter.hasIncompleteSteps).toBe(true);
    expect(sorter.startInd).toBe(1);
    expect(sorter.endInd).toBe(2);
    expect(sorter.candidateInd).toBe(undefined);
    expect(sorter.nextInd).toBe(2);
    expect(sorter.items).toEqual([92, 6, 48]);
  });

  it('пустой массив', () => {
    sorter.setItems([]);

    expect(sorter.items?.length).toBe(0);

    sorter.sort();

    expect(sorter.items?.length).toBe(0);
  });

  it('из одного элемента', () => {
    sorter.setItems([5]);
    //sorter.prepareSorter(SortingMode.Bubble, Direction.Ascending);

    expect(sorter.items?.length).toBe(1);

    sorter.sort();

    expect(sorter.items).toEqual([5]);
  });

  it('из нескольких элементов по возрастанию', () => {
    sorter.setItems([55, 44, 88]);
    sorter.prepareSorter(SortingMode.Bubble, Direction.Ascending);

    expect(sorter.items?.length).toBe(3);

    sorter.sort();

    expect(sorter.items).toEqual([44, 55, 88]);
  });

  it('из нескольких элементов по убыванию', () => {
    sorter.setItems([55, 44, 88]);
    sorter.prepareSorter(SortingMode.Bubble, Direction.Descending);

    expect(sorter.items?.length).toBe(3);

    sorter.sort();

    expect(sorter.items).toEqual([88, 55, 44]);
  });
});
