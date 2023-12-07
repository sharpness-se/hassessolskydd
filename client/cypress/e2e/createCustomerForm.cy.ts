describe('Create Customer Form Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.contains('Skapa ny kund').click();
  });

  it('should submit the form successfully', () => {

    cy.intercept('POST', 'http://localhost:8080/api/customers/create_customer').as('handleSubmit');

    cy.get('input[id="firstname"]').type('Test');
    cy.get('input[id="lastname"]').type('Testson');
    cy.get('input[id="email"]').type('test@test.com');
    cy.get('input[id="phoneNumber"]').type('0731112233');
    cy.get('input[id="address"]').type('Testgatan 35');
    cy.get('input[id="city"]').type('Teststaden');
    cy.get('input[id="postalCode"]').type('12344');

    cy.get('button[type="submit"]').click();

    cy.wait('@handleSubmit').its('response.statusCode').should('eq', 200);
  })
})