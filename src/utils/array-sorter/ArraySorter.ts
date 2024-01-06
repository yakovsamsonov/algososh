import { SortingMode, Direction } from '../../types';

interface TArraySorter<T> {
  mode: SortingMode;
  direction: Direction;
  hasIncompleteSteps: boolean;
  items?: Array<T>;
  startInd?: number;
  currentInd?: number;
  candidateInd?: number;
  nextInd?: number;
  endInd?: number;
}

export class ArraySorter<T> implements TArraySorter<T> {
  mode: SortingMode;
  direction: Direction;
  hasIncompleteSteps: boolean;
  items?: Array<T>;
  startInd: number;
  currentInd?: number;
  candidateInd?: number;
  nextInd?: number;
  endInd?: number;

  constructor(mode?: SortingMode, direction?: Direction) {
    this.mode = mode || SortingMode.Selection;
    this.direction = direction || Direction.Ascending;
    this.hasIncompleteSteps = false;
    this.items = undefined;
    this.startInd = 0;
    this.currentInd = undefined;
    this.candidateInd = undefined;
    this.nextInd = undefined;
    this.endInd = undefined;
  }

  prepareSorter = (mode: SortingMode, direction: Direction) => {
    this.mode = mode;
    this.direction = direction;
    this._resetIndexes();
  };

  setItems = (items: Array<T>) => {
    this.items = items;
    this.currentInd = undefined;
    this.candidateInd = undefined;
    this.nextInd = undefined;
    this.endInd = items.length - 1;
  };

  _resetIndexes = () => {
    this.startInd = 0;
    this.currentInd = 0;
    this.candidateInd = undefined;
    this.nextInd = 1;
    if (this.items) {
      this.endInd = this.items?.length - 1;
      this.hasIncompleteSteps = this.items.length !== 0;
    }
  };

  doOneSortingStep = () => {
    if (
      this.currentInd !== undefined &&
      this.nextInd !== undefined &&
      this.items !== undefined &&
      this.hasIncompleteSteps
    ) {
      const curr = this.items[this.currentInd];
      const next = this.items[this.nextInd];
      const candidate = this.candidateInd
        ? this.items[this.candidateInd]
        : undefined;
      if (this.mode === SortingMode.Selection) {
        if (
          (this.direction === Direction.Ascending &&
            next < (candidate ? candidate : curr)) ||
          (this.direction === Direction.Descending &&
            next > (candidate ? candidate : curr))
        ) {
          this.candidateInd = this.nextInd;
        }
        if (this.nextInd !== this.endInd) {
          this.nextInd++;
        } else {
          if (this.candidateInd) {
            this._swap(this.currentInd, this.candidateInd);
          }
          this.startInd++;
          this.currentInd = this.startInd;
          this.nextInd =
            this.currentInd === this.endInd
              ? this.currentInd
              : this.currentInd + 1;
          this.candidateInd = undefined;
        }
      } else if (this.mode === SortingMode.Bubble) {
        if (
          (this.direction === Direction.Ascending && next < curr) ||
          (this.direction === Direction.Descending && next > curr)
        ) {
          this._swap(this.currentInd, this.nextInd);
        }
        if (this.nextInd !== this.endInd) {
          this.nextInd++;
          this.currentInd++;
        } else {
          this.endInd--;
          this.currentInd = 0;
          this.nextInd = 1;
        }
      }

      if (
        this.currentInd !== undefined &&
        this.endInd !== undefined &&
        this.currentInd < this.endInd
      ) {
        this.hasIncompleteSteps = true;
      } else {
        this.hasIncompleteSteps = false;
      }
    }
  };

  _swap = (firstIndex: number, secondIndex: number): void => {
    if (this.items) {
      const temp = this.items[firstIndex];
      this.items[firstIndex] = this.items[secondIndex];
      this.items[secondIndex] = temp;
    }
  };

  sort = () => {
    while (this.hasIncompleteSteps) {
      this.doOneSortingStep();
    }
  };

  getCurrentPointers = (): Array<number> => {
    const pointers = [];
    if (
      this.hasIncompleteSteps &&
      this.currentInd !== undefined &&
      this.nextInd !== undefined
    ) {
      pointers.push(this.currentInd);
      pointers.push(this.nextInd);
    }
    return pointers;
  };

  getCompletedPointers = (): Array<number> => {
    const pointers = [];
    if (
      this.items !== undefined &&
      this.startInd !== undefined &&
      this.currentInd !== undefined &&
      this.nextInd !== undefined &&
      this.endInd !== undefined
    ) {
      for (let ind = 0; ind < this.items.length; ind++) {
        if (
          ind < this.startInd ||
          (ind === this.currentInd && ind === this.nextInd) ||
          ind > this.endInd ||
          (ind === this.currentInd && ind === this.endInd)
        ) {
          pointers.push(ind);
        }
      }
    }
    return pointers;
  };
}
