interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  getListedValues: () => Array<T | undefined>;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[] = [];
  head: number | null = null;
  tail: number | null = null;
  private readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
    for (let i = 0; i < size; i++) {
      this.container[i] = undefined;
    }
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }
    if (this.tail !== null) {
      this.tail++;
      this.container[this.tail % this.size] = item;
    } else {
      this.container[0] = item;
      this.tail = 0;
      this.head = 0;
    }

    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    if (this.head !== null) {
      this.container[this.head % this.size] = undefined;
      this.head++;
    }
    this.length--;
  };

  clear = () => {
    this.head = null;
    this.tail = null;
    this.length = 0;
    for (let i = 0; i < this.size; i++) {
      this.container[i] = undefined;
    }
  };

  getListedValues = () => {
    return this.container;
  };

  getHeadIndex = () => {
    if (this.head !== null) {
      return this.head % this.size;
    }
  };

  getTailIndex = () => {
    if (this.tail !== null) {
      return this.tail % this.size;
    }
  };

  isEmpty = () => this.length === 0;

  isFull = () => {
    return this.length === this.size;
  };
}
