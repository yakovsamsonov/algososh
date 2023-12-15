type THash<T> = {
  [index: number]: T;
};

interface TFibonacciCalculator {
  hash: THash<number>;
}

export class FibonacciCalculator implements TFibonacciCalculator {
  hash: {
    [index: number]: number;
  };

  constructor() {
    this.hash = {
      0: 1,
      1: 1,
    };
  }

  _addToHash = (num: number, fibonacci: number) => {
    this.hash = { ...this.hash, [num]: fibonacci };
  };

  calculate = (n: number): number => {
    if (n < 0) {
      throw new Error(`Can/'t calulate Fibonacci for negative numbers`);
    }
    if (n in this.hash) {
      return this.hash[n];
    } else {
      const fibonacci = this.calculate(n - 1) + this.calculate(n - 2);
      this._addToHash(n, fibonacci);
      return fibonacci;
    }
  };
}
