describe('string algo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');

    cy.get('input').as('textField');

    cy.get('button').contains('Развернуть').parent().as('actionButton');
  });

  it('button disabled when no input', () => {
    cy.get('@textField').should('be.empty');
    cy.get('@actionButton').should('be.disabled');
  });

  it('creates and reverts list on click', () => {
    cy.get('@textField').type('слово');
    cy.get('@actionButton').click();
    cy.get('button > img');

    cy.get('[class*="result-container"]').as('results');
    cy.get('@results')
      .find('[class*="circle_content"]')
      .should('have.length', 5);
    cy.get('@results')
      .find('[class*="circle_content"]')
      .first()
      .as('first_element');
    cy.get('@first_element').next().as('second_element');
    cy.get('@second_element').next().as('third_element');
    cy.get('@third_element').next().as('forth_element');
    cy.get('@forth_element').next().as('fifth_element');

    cy.get('@first_element').contains('с');
    cy.get('@first_element').children(['class*=circle_changing']);

    cy.get('@second_element').contains('л');
    cy.get('@second_element').children(['class*=circle_default']);

    cy.get('@third_element').contains('о');
    cy.get('@third_element').children(['class*=circle_default']);

    cy.get('@forth_element').contains('в');
    cy.get('@forth_element').children(['class*=circle_default']);

    cy.get('@fifth_element').contains('о');
    cy.get('@fifth_element').children(['class*=circle_changing']);

    cy.get('@first_element').contains('о');
    cy.get('@first_element').children('[class*=circle_modified]');

    cy.get('@second_element').contains('л');
    cy.get('@second_element').children(['class*=circle_changing']);

    cy.get('@third_element').contains('о');
    cy.get('@third_element').children(['class*=circle_default']);

    cy.get('@forth_element').contains('в');
    cy.get('@forth_element').children(['class*=circle_changing']);

    cy.get('@fifth_element').contains('с');
    cy.get('@fifth_element').children(['class*=circle_modified']);

    cy.get('@first_element').contains('о');
    cy.get('@first_element').children('[class*=circle_modified]');

    cy.get('@second_element').contains('в');
    cy.get('@second_element').children(['class*=circle_modified']);

    cy.get('@third_element').contains('о');
    cy.get('@third_element').children(['class*=circle_changing']);

    cy.get('@forth_element').contains('л');
    cy.get('@forth_element').children(['class*=circle_modified']);

    cy.get('@fifth_element').contains('с');
    cy.get('@fifth_element').children(['class*=circle_modified']);

    cy.get('@results')
      .find('[class*="circle_modified"]')
      .should('have.length', 5);

    cy.get('button > img').should('not.exist');
  });
});
