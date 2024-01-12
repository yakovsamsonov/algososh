interface IRefersableList<T> {
  initialArr: Array<T>;
  currentArr: Array<T>;
  hasIncompleteSteps: boolean;
  head?: number;
  tail?: number;
}

export class ReversableList<T> implements IRefersableList<T> {
  initialArr;
  currentArr;
  hasIncompleteSteps;
  head?: number;
  tail?: number;

  constructor(arr: Array<T>) {
    this.initialArr = arr;
    this.currentArr = Array.from(arr);
    this.hasIncompleteSteps = arr.length !== 0;
    this.head = undefined;
    this.tail = undefined;
  }

  _initCounters = () => {
    this.head = 0;
    this.tail = this.initialArr.length - 1;
    this.hasIncompleteSteps = this.initialArr.length !== 0;
  };

  _swap = (firstIndex: number, secondIndex: number) => {
    const temp = this.currentArr[firstIndex];
    this.currentArr[firstIndex] = this.currentArr[secondIndex];
    this.currentArr[secondIndex] = temp;
  };

  changeInitialArr = (arr: Array<T>) => {
    this.initialArr = arr;
    this.currentArr = arr;
    this._initCounters();
  };

  reset = () => {
    this.currentArr = [...this.initialArr];
    this._initCounters();
  };

  doNextStep = () => {
    if (
      this.head !== undefined &&
      this.tail !== undefined &&
      this.hasIncompleteSteps
    ) {
      this._swap(this.head, this.tail);
      this.head++;
      this.tail--;
      if (this.head <= this.tail) {
        this.hasIncompleteSteps = true;
      } else {
        this.hasIncompleteSteps = false;
      }
    }
  };

  swap = () => {
    while (this.hasIncompleteSteps) {
      this.doNextStep();
    }
  };

  getCurrentPointers = (): Array<number> => {
    const pointers = [];
    if (
      this.hasIncompleteSteps &&
      this.head !== undefined &&
      this.tail !== undefined
    ) {
      pointers.push(this.head);
      pointers.push(this.tail);
    }
    return pointers;
  };

  getCompletedPointers = (): Array<number> => {
    const pointers = [];
    if (this.head !== undefined && this.tail !== undefined) {
      for (let i = 0; i < this.currentArr.length; i++) {
        if (i < this.head || i > this.tail) {
          pointers.push(i);
        }
      }
    }
    return pointers;
  };
}
