/// <reference types="cypress" />

describe('Create Order Tests', () => {
  it('Successfully submits order', () => {
    cy.visit('http://localhost:8080/skapaorder')

    // Select customer
    cy.get("#muiAutocomplete").click();
    cy.get("#muiAutocomplete").type("Customer 1");
    cy.get("#muiAutocomplete-option-0 > div").click();
    cy.get(".MuiAutocomplete-root input").should("include.value", "Customer 1 Lastname 1");

    // Select product
    cy.contains('h2', 'Produkter')
      .parents('.bg-white') 
      .as('product-accordion'); 

    cy.get('@product-accordion').click();
    cy.get('@product-accordion')
      .find('select')
      .select('Pilsegardin');

    // Fill out and submit Product form
    cy.get('input[id="numberOfProduct"]').type('2');   
    cy.get('input[id="width"]').type('100');
    cy.get('input[id="height"]').type('300');
    cy.get('input[id="model"]').type('Very fancy');
    cy.get('input[id="weave"]').type('500');
    cy.get('input[id="beslag"]').type('Oki');
    cy.get('input[id="ordinaryFitting"]').type('Very nice');
    cy.get('input[id="remote"]').type('Very nice');
    cy.get('input[id="color"]').type('Pink');

    cy.get('@product-accordion').get('form').submit();

    // Write a note for the order
    cy.contains('h2', 'Anteckningar')
      .parents('.bg-white') 
      .as('notes-accordion');
      
    cy.get('@notes-accordion').click();
    cy.get('@notes-accordion')
      .find('textarea')
      .type('This is a mighty fine note.');

    // Add installation details
    cy.contains('h2', 'Montering')
      .parents('.bg-white') 
      .as('installation-accordion');

    cy.get('@installation-accordion').click();
    
    cy.get('input[value="advanced"]').click();
    cy.get('input[id="våning"]').type('3');
    cy.get('input[id="fasad"]').type('Wood');
    cy.get('input[id="kabel"]').type('5m');
    cy.get('input[id="fjärrkontroll"]').type('Mono');
    cy.get('input[id="lift"]').check();
    cy.get('textarea[id="monteringsanteckningar"]').type('Very comprehensible notes!');

    // Submit order
    cy.contains('button', 'Submit Order').click();
    cy.contains('Order Submitted Successfully!').should('be.visible');

  });
});