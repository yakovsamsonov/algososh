class Node<T> {
  value?: T;
  next: Node<T> | null;
  constructor(value?: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
  getListedValues: () => Array<T | undefined>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialList?: Array<T>) {
    this.head = null;
    this.size = 0;
    if (initialList) {
      initialList.forEach((el) => this.append(el));
    }
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        for (currIndex; currIndex < index - 1; currIndex++) {
          if (curr) {
            curr = curr.next;
          }
        }

        // добавить элемент
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  clearValueAt(index: number) {
    let removedValue;
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
    } else if (this.head) {
      let curr: Node<T> | null = this.head;
      for (let i = 0; i < index; i++) {
        curr = curr ? curr.next : null;
      }
      if (curr) {
        removedValue = curr.value;
        curr.value = undefined;
      }
    }
    return removedValue;
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else if (this.head) {
      let dummyHead = new Node(this.head.value);
      dummyHead.next = this.head;
      let curr: Node<T> | null = dummyHead;
      for (let i = 0; i < index; i++) {
        curr = curr ? curr.next : null;
      }
      if (curr) {
        curr.next = curr.next ? curr.next.next : null;
      }
      this.head = dummyHead.next;
      this.size--;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      this.head = node;
      this.head.next = current;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }

  getListedValues = () => {
    let curr = this.head;
    const res: Array<T | undefined> = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  };
}
