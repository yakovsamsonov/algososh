const checkListContent = (expectedContent, startsFrom = 0, maxLength = 7) => {
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

describe('list algo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
    cy.get('input[placeholder*="Введите значение"]').as('valueField');
    cy.get('input[placeholder*="Введите индекс"]').as('indexField');

    cy.get('button').as('buttons');

    cy.get('@buttons').contains('Добавить в head').parent().as('addHeadButton');
    cy.get('@buttons').contains('Добавить в tail').parent().as('addTailButton');
    cy.get('@buttons')
      .contains('Добавить по индексу')
      .parent()
      .as('addIndexButton');
    cy.get('@buttons')
      .contains('Удалить из head')
      .parent()
      .as('removeHeadButton');
    cy.get('@buttons')
      .contains('Удалить из tail')
      .parent()
      .as('removeTailButton');
    cy.get('@buttons')
      .contains('Удалить по индексу')
      .parent()
      .as('removeIndexButton');
  });

  it('buttons disabled when no index input', () => {
    cy.get('@indexField').should('be.empty');
    cy.get('@addIndexButton').should('be.disabled');
    cy.get('@removeIndexButton').should('be.disabled');
  });

  it('buttons disabled when no text input', () => {
    cy.get('@valueField').should('be.empty');
    cy.get('@addIndexButton').should('be.disabled');
    cy.get('@addHeadButton').should('be.disabled');
    cy.get('@addTailButton').should('be.disabled');
  });

  it('shows default list', () => {
    cy.get('[class*="result-container"]');
    checkListContent([4, 6, 7, 15], 0, 4);
    cy.get('@removeTailButton').should('be.enabled');
    cy.get('@removeHeadButton').should('be.enabled');
  });

  it('adds to head', () => {
    cy.get('@valueField').type(55);
    cy.get('@addHeadButton').click();
    cy.get('[class*="result-container"]')
      .children('[class*="circle_content"]')
      .first()
      .as('head');
    cy.get('@head')
      .find('[class*="circle_head"]')
      .find('[class*=circle_changing]');
    cy.get('@head').find('[class*="circle_head"]').contains(55);
    cy.get('@head').find('[class*=circle_modified]');
    cy.get('@head').find('[class*=circle_default]');
    checkListContent([55, 4, 6, 7, 15], 0, 5);
  });

  it('adds to tail', () => {
    cy.get('@valueField').type(92);
    cy.get('@addTailButton').click();
    cy.get('[class*="result-container"]')
      .children('[class*="circle_content"]')
      .last()
      .as('tail');
    cy.get('@tail').find('[class*="circle_head"]').contains(92);
    cy.get('@tail')
      .find('[class*="circle_head"]')
      .find('[class*="circle_changing"]');

    cy.get('@tail').find('[class*="circle_modified"]');
    cy.get('@tail').find('[class*="circle_default"]');
    checkListContent([4, 6, 7, 15, 92], 0, 5);
  });

  it('adds by index', () => {
    cy.get('@valueField').type(555);
    cy.get('@indexField').type(2);
    cy.get('@addIndexButton').click();
    cy.get('[class*="result-container"]')
      .children('[class*="circle_content"]')
      .as('childs');
    cy.get('@childs')
      .find('[class*="circle_changing"]')
      .should('have.length', 1);
    cy.get('@childs')
      .find('[class*="circle_changing"]')
      .should('have.length', 2);
    cy.get('@childs')
      .find('[class*="circle_changing"]')
      .should('have.length', 4);
    cy.get('@childs')
      .last()
      .prev()
      .prev()
      .find('[class*="circle_head"]')
      .contains(555);
    cy.get('@childs')
      .last()
      .prev()
      .prev()
      .find('[class*="circle_head"]')
      .find('[class*=circle_changing]');

    cy.get('@childs')
      .find('[class*="circle_modified"]')
      .should('have.length', 1);
    cy.get('@childs')
      .find('[class*="circle_default"]')
      .should('have.length', 5);
    checkListContent([4, 6, 555, 7, 15], 0, 5);
  });

  it('removes from head', () => {
    cy.get('@removeHeadButton').click();
    cy.get('[class*="result-container"]')
      .children('[class*="circle_content"]')
      .first()
      .as('head');
    cy.get('@head')
      .find('[class*="circle_tail"]')
      .find('[class*=circle_changing]');
    cy.get('@head').find('[class*="circle_tail"]').contains(4);
    checkListContent([6, 7, 15], 0, 3);
  });

  it('removes from tail', () => {
    cy.get('@removeTailButton').click();
    cy.get('[class*="result-container"]')
      .children('[class*="circle_content"]')
      .last()
      .as('tail');
    cy.get('@tail').find('[class*="circle_tail"]').contains(15);
    cy.get('@tail')
      .find('[class*="circle_tail"]')
      .find('[class*="circle_changing"]');
    checkListContent([4, 6, 7], 0, 3);
  });

  it('removes by index', () => {
    cy.get('@indexField').type(2);
    cy.get('@removeIndexButton').click();
    cy.get('[class*="result-container"]')
      .children('[class*="circle_content"]')
      .as('childs');
    cy.get('@childs')
      .find('[class*="circle_changing"]')
      .should('have.length', 1);
    cy.get('@childs')
      .find('[class*="circle_changing"]')
      .should('have.length', 2);
    cy.get('@childs')
      .find('[class*="circle_changing"]')
      .should('have.length', 4);
    cy.get('@childs')
      .last()
      .prev()
      .prev()
      .find('[class*="circle_tail"]')
      .contains(7);
    cy.get('@childs')
      .last()
      .prev()
      .prev()
      .find('[class*="circle_tail"]')
      .find('[class*=circle_changing]');

    cy.get('@childs')
      .find('[class*="circle_default"]')
      .should('have.length', 3);
    checkListContent([4, 6, 15], 0, 3);
  });
});
