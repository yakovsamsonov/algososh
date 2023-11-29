interface IRefersableList<T> {
  initialArr: Array<T>;
  currentArr: Array<T>;
  head: number | null;
  tail: number | null;
  stepDelay?: number;
}

export class ReversableList<T> implements IRefersableList<T> {
  initialArr;
  currentArr;
  head: number | null;
  tail: number | null;
  stepDelay;

  constructor(arr: Array<T>, stepDelay?: number) {
    this.initialArr = arr;
    this.currentArr = arr;
    this.head = null;
    this.tail = null;
    this.stepDelay = stepDelay;
  }

  changeInitialArr = (arr: Array<T>) => {
    this.initialArr = arr;
    this.currentArr = arr;
    this.head = null;
    this.tail = null;
  };

  initCounters = () => {
    if (this.head === null && this.tail === null) {
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
    if (this.head !== null && this.tail !== null) {
      this._swap(this.head, this.tail);
      this.head++;
      this.tail--;
    }
  };
}
