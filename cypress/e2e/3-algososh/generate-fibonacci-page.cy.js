const checkLengthandLastValue = (length, lastValue) => {
  cy.get('@results')
    .find('div[class*="circle_content"]')
    .should('have.length', length);
  cy.get('@results')
    .find('div[class*="circle_content"]')
    .last()
    .as('last_element');
  cy.get('@last_element').contains(lastValue);
};

describe('fibonacci algo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');

    cy.get('input').as('textField');

    cy.get('button').contains('Рассчитать').parent().as('actionButton');
  });

  it('button disabled when no input', () => {
    cy.get('@textField').should('be.empty');
    cy.get('@actionButton').should('be.disabled');
  });

  it('generates fibonacci on click', () => {
    cy.get('@textField').type(5);
    cy.get('@actionButton').click();
    cy.get('button > img');

    cy.get('[class*="result-container"]').as('results');

    checkLengthandLastValue(1, 1);
    checkLengthandLastValue(2, 1);
    checkLengthandLastValue(3, 2);
    checkLengthandLastValue(4, 3);
    checkLengthandLastValue(5, 5);
    checkLengthandLastValue(6, 8);

    cy.get('button > img').should('not.exist');
  });
});
