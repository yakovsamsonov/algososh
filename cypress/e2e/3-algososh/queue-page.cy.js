const checkQueueContent = (expectedContent, startsFrom = 0, maxLength = 7) => {
  cy.get('[class*=circle_content]')
    .should('have.length', maxLength)
    .each(($el, index) => {
      if (index === startsFrom && expectedContent.length > 0) {
        cy.wrap($el).contains('head');
      } else {
        cy.wrap($el).find('[class*="circle_head"]').should('be.empty');
      }
      if (index === expectedContent.length - 1 + startsFrom) {
        cy.wrap($el).contains('tail');
      } else {
        cy.wrap($el).find('[class*="circle_tail"]').should('be.empty');
      }
      if (index - startsFrom < expectedContent.length && index >= startsFrom) {
        cy.wrap($el).contains(expectedContent[index - startsFrom]);
      } else {
        cy.wrap($el).find('[class*="circle_letter"]').should('be.empty');
      }
    });
};

const prepareSimpleQueue = () => {
  cy.get('@textField').type(92);
  cy.get('@addButton').click();
  cy.get('@textField').type(44);
  cy.get('@addButton').click();
  cy.get('@textField').type(8888);
  cy.get('@addButton').click();
  cy.get('@removeButton').should('be.enabled');
  cy.get('@clearButton').should('be.enabled');
  checkQueueContent([92, 44, 8888]);
};

describe('queue algo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');

    cy.get('input[placeholder*="Введите значение"]').as('textField');

    cy.get('button').as('buttons');

    cy.get('@buttons').contains('Добавить').parent().as('addButton');
    cy.get('@buttons').contains('Удалить').parent().as('removeButton');
    cy.get('@buttons').contains('Очистить').parent().as('clearButton');
  });

  it('add button disabled when no input', () => {
    cy.get('@textField').should('be.empty');
    cy.get('@addButton').should('be.disabled');
  });

  it('shows empty queue', () => {
    cy.get('[class*="result-container"]');
    checkQueueContent([]);
  });

  it('remove and clear buttons disabled when no queue', () => {
    cy.get('@textField').type(13);
    cy.get('@addButton').should('be.enabled');
    cy.get('@removeButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');
  });

  it('add 1 element into queue', () => {
    cy.get('@textField').type(92);
    cy.get('@addButton').click();
    cy.get('@textField').should('be.empty');
    cy.get('button > img').should('have.length', 1);
    cy.get('button').contains('Добавить').should('not.exist');
    cy.get('@removeButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');

    cy.get('[class*="result-container"]')
      .find('[class*="circle_content"]')
      .first()
      .as('queueStart');

    cy.get('@queueStart').find('[class*=circle_changing]');
    cy.get('@queueStart').find('[class*=circle_default]');
    checkQueueContent([92]);
    cy.get('@removeButton').should('be.enabled');
    cy.get('@clearButton').should('be.enabled');
  });

  it('remove 1 element from queue', () => {
    prepareSimpleQueue();

    cy.get('[class*="result-container"]')
      .find('[class*="circle_content"]')
      .first()
      .as('queueStart');

    cy.get('@removeButton').click();
    cy.get('button > img').should('have.length', 1);
    cy.get('button').contains('Удалить').should('not.exist');
    cy.get('@addButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');

    cy.get('@queueStart').find('[class*=circle_changing]');

    cy.get('@removeButton').should('be.enabled');
    cy.get('@clearButton').should('be.enabled');
    checkQueueContent([44, 8888], 1);
  });

  it('clears queue', () => {
    prepareSimpleQueue();

    cy.get('@clearButton').click();

    checkQueueContent([]);
    cy.get('@removeButton').should('be.disabled');
    cy.get('@clearButton').should('be.disabled');
  });
});
