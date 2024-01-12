const prepareSimpleStack = () => {
  cy.get('@textField').type(13);
  cy.get('@addButton').click();
  cy.get('@textField').type(18);
  cy.get('@addButton').click();
  cy.get('@textField').type(22);
  cy.get('@addButton').click();
  cy.get('@removeButton').should('be.enabled');
  cy.get('@clearButton').should('be.enabled');
};

describe('stack algo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');

    cy.get('input').as('textField');

    cy.get('button').as('buttons');

    cy.get('@buttons').contains('Добавить').parent().as('addButton');
    cy.get('@buttons').contains('Удалить').parent().as('removeButton');
    cy.get('@buttons').contains('Очистить').parent().as('clearButton');
  });

  it('add button disabled when no input', () => {
    cy.get('@textField').should('be.empty');
    cy.get('@addButton').should('be.disabled');
  });

  it('remove and clear buttons disabled when no stack', () => {
    cy.get('@textField').type(13);
    cy.get('@addButton').should('be.enabled');
    cy.get('@removeButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');
  });

  it('add 1 element into stack', () => {
    cy.get('@textField').type(13);
    cy.get('@addButton').click();
    cy.get('@textField').should('be.empty');
    cy.get('button > img').should('have.length', 1);
    cy.get('button').contains('Добавить').should('not.exist');
    cy.get('@removeButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');

    cy.get('[class*="result-container"]')
      .find('[class*="circle_content"]')
      .last()
      .as('actionCircle');
    cy.get('@actionCircle').find('[class*=circle_changing]');
    cy.get('@actionCircle').find('[class*=circle_modified]');
    cy.get('@actionCircle').contains(13);
    cy.get('@removeButton').should('be.enabled');
    cy.get('@clearButton').should('be.enabled');
  });

  it('remove 1 element from stack', () => {
    prepareSimpleStack();

    cy.get('@removeButton').click();
    cy.get('button > img').should('have.length', 1);
    cy.get('button').contains('Удалить').should('not.exist');
    cy.get('@addButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');

    cy.get('[class*="result-container"]')
      .find('[class*="circle_content"]')
      .last()
      .as('actionCircle');
    cy.get('@actionCircle').contains(22);
    cy.get('@actionCircle').find('[class*=circle_changing]');

    cy.get('@removeButton').should('be.enabled');
    cy.get('@clearButton').should('be.enabled');
  });

  it('clears stack', () => {
    prepareSimpleStack();

    cy.get('@clearButton').click();

    cy.get('[class*="result-container"]').children().should('not.exist');

    cy.get('@removeButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');
  });
});
