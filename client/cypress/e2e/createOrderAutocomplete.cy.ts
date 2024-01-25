/// <reference types="cypress" />

describe("Create order autocomplete tests", () => {
  beforeEach(() => {
    //cy.setBaseUrl("http://localhost:8080")
    cy.visit('http://localhost:8080/skapaorder');
  });

  // it("the h1 contains the correct text", () => {
  //   cy.getByData("hero-heading").contains("Skapa Order");
  // });

  it("Autocomplete contains populated options list", () => {
    cy.intercept("GET", "/api/customers").as("getCustomerList");
    cy.wait("@getCustomerList");
    cy.get(".MuiAutocomplete-root").click();
    cy.get(".MuiAutocomplete-listbox")
      .find("li")
      .should("have.length.at.least", 20)
      .then(($liTags) => {
        const liCount = $liTags.length;
        cy.log(`Number of <li> tags: ${liCount}`);
      });
  });

  it("Search,Select Palle Kuling, check results populate selectedResults", () => {
    cy.get("#muiAutocomplete").click();
    cy.get("#muiAutocomplete").type("08-123 45 67");
    cy.get(".MuiAutocomplete-listbox")
      .find("li")
      .should("have.lengthOf.at.most", 1)
      .then(($liTags) => {
        const liCount = $liTags.length;
        cy.log(`Number of <li> tags: ${liCount}`);
      });
      cy.get("#muiAutocomplete-option-0 > div").click();
      cy.get(".MuiAutocomplete-root input").should("include.value", "Palle Kuling")

      cy.get("#selectedResults").should("exist");
      cy.get("#kundnummer").should("include.text", "pallekuling0812345678")
      cy.get("#email").should("include.text", "pallekuling@fazer.se")
      cy.get("#telefon").should("include.text", "08-123 45 67")
      cy.get("#adress").should("include.text", "Fazers väg 10,111 22 Stockholm")
  });

    
});
