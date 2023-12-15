type TNode<T> = {
  value: T;
  prev: TNode<T> | null;
};

interface IStack<T> {
  head: TNode<T> | null;
}

class Node<T> implements TNode<T> {
  value: T;
  prev: TNode<T> | null;

  constructor(item: T) {
    this.value = item;
    this.prev = null;
  }
}

export class Stack<T> implements IStack<T> {
  head: TNode<T> | null;

  constructor() {
    this.head = null;
  }

  push(value: T) {
    const el = new Node(value);
    el.prev = this.head;
    this.head = el;
  }

  pop() {
    const newHead = this.head?.prev || null;
    this.head = newHead;
  }

  clear() {
    while (this.head) {
      this.pop();
    }
  }

  getListedValues() {
    const items: Array<T> = [];
    let cur = this.head;
    while (cur) {
      items.push(cur.value);
      cur = cur.prev;
    }
    return items.reverse();
  }
}
