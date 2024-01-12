describe('main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('has 6 links', () => {
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');

    cy.get('a[href*="recursion"]');
    cy.get('a[href*="fibonacci"]');
    cy.get('a[href*="sorting"]');
    cy.get('a[href*="stack"]');
    cy.get('a[href*="queue"]');
    cy.get('a[href*="list"]');
  });

  it('opens string algo', () => {
    cy.get('a[href*="recursion"]').click();

    cy.location('pathname').should('include', 'recursion');
    cy.contains('Строка');
    cy.contains('К оглавлению').click();
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('opens fibonacci algo', () => {
    cy.get('a[href*="fibonacci"]').click();

    cy.location('pathname').should('include', 'fibonacci');
    cy.contains('Последовательность Фибоначчи');
    cy.contains('К оглавлению').click();
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('opens sorting algo', () => {
    cy.get('a[href*="sorting"]').click();

    cy.location('pathname').should('include', 'sorting');
    cy.contains('Сортировка массива');
    cy.contains('К оглавлению').click();
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('opens stack algo', () => {
    cy.get('a[href*="stack"]').click();

    cy.location('pathname').should('include', 'stack');
    cy.contains('Стек');
    cy.contains('К оглавлению').click();
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('opens queue algo', () => {
    cy.get('a[href*="queue"]').click();

    cy.location('pathname').should('include', 'queue');
    cy.contains('Очередь');
    cy.contains('К оглавлению').click();
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });

  it('opens list algo', () => {
    cy.get('a[href*="list"]').click();

    cy.location('pathname').should('include', 'list');
    cy.contains('Связный список');
    cy.contains('К оглавлению').click();
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
  });
});
