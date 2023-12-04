interface IRefersableList<T> {
  initialArr: Array<T>;
  currentArr: Array<T>;
  head?: number;
  tail?: number;
  stepDelay?: number;
}

export class ReversableList<T> implements IRefersableList<T> {
  initialArr;
  currentArr;
  head?: number;
  tail?: number;
  stepDelay;

  constructor(arr: Array<T>, stepDelay?: number) {
    this.initialArr = arr;
    this.currentArr = arr;
    this.head = undefined;
    this.tail = undefined;
    this.stepDelay = stepDelay;
  }

  changeInitialArr = (arr: Array<T>) => {
    this.initialArr = arr;
    this.currentArr = arr;
    this.head = undefined;
    this.tail = undefined;
  };

  initCounters = () => {
    if (this.head === undefined || this.tail === undefined) {
      this.head = 0;
      this.tail = this.initialArr.length - 1;
    }
  };

  reset = () => {
    this.currentArr = [...this.initialArr];
    this.head = 0;
    this.tail = this.initialArr.length - 1;
  };

  _swap = (firstIndex: number, secondIndex: number) => {
    const temp = this.currentArr[firstIndex];
    this.currentArr[firstIndex] = this.currentArr[secondIndex];
    this.currentArr[secondIndex] = temp;
  };

  swap = () => {
    if (this.head !== undefined && this.tail !== undefined) {
      this._swap(this.head, this.tail);
      this.head++;
      this.tail--;
    }
  };
}
