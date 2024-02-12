/// <reference types="cypress" />

describe("See all orders tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/seordrar");
    cy.intercept("GET", "/api/order/all", (req) => {
      req.reply({
        body: [
          {
            order: {
              id: -1,
              customerNumber: "CUST001",
              firstContact: "2023-11-01T00:00:00",
              measurementDate: "2023-11-05T00:00:00",
              installationDate: "2023-11-15T00:00:00",
              notes: "Notes for order 1",
              installationDetails: null,
              indoorOutdoor: "INDOOR",
              orderItems: [
                {
                  name: "persienn",
                  attributes: ["colour", "height", "width"],
                  values: ["pink", "1500", "1200"],
                },
                {
                  name: "persienn",
                  attributes: ["colour", "height", "width"],
                  values: ["white", "1500", "1200"],
                },
                {
                  name: "fönstermarkis",
                  attributes: ["höjd", "bredd", "markisfärg"],
                  values: ["1800", "2000", "rosa"],
                },
              ],
            },
            customer: {
              id: -1,
              firstname: "Customer 1",
              lastname: "Lastname 1",
              address: "123 Main St",
              postalCode: "111 11",
              city: "Stockholm",
              phoneNumber: "555-123-4567",
              email: "customer1@example.com",
              customerNumber: "CUST001",
            },
          },
          {
            order: {
              id: -2,
              customerNumber: "CUST002",
              firstContact: "2023-11-02T00:00:00",
              measurementDate: "2023-11-06T00:00:00",
              installationDate: "2023-11-16T00:00:00",
              notes: "Notes for order 2",
              installationDetails: null,
              indoorOutdoor: "OUTDOOR",
              orderItems: [
                {
                  name: "fönstermarkis",
                  attributes: ["height", "width"],
                  values: ["1800", "2000"],
                },
              ],
            },
            customer: {
              id: -2,
              firstname: "Customer 2",
              lastname: "Lastname 2",
              address: "456 Elm St",
              postalCode: "222 22",
              city: "Skåne",
              phoneNumber: "555-987-6543",
              email: "customer2@example.com",
              customerNumber: "CUST002",
            },
          },
        ],
      });
    });
  });

  it("Checks that table is populated", () => {
    cy.get("table").should("exist"); 
    cy.get("table tbody tr").should("have.length", 2);
  });

  it('Sorts table by Customer', () => {
    cy.contains('th', 'Customer').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain', 'Customer 2 Lastname 2');
    });
    cy.contains('th', 'Customer').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain', 'Customer 1 Lastname 1');
    });
  });

  it('Sorts table by Customer ID', () => {
    cy.contains('th', 'Customer Id').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(1).should('contain', 'CUST002');
    });
    cy.contains('th', 'Customer Id').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(1).should('contain', 'CUST001');
    });
  });

  it('Sorts table by Date', () => {
    cy.contains('th', 'Date').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(2).should('contain', '2023-11-02');
    });
    cy.contains('th', 'Date').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(2).should('contain', '2023-11-01');
    });
  });

  it('Sorts table by Order Id', () => {
    cy.contains('th', 'Order Id').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(3).should('contain', '-2');
    });
    cy.contains('th', 'Order Id').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(3).should('contain', '-1');
    });
  });

  it('Sorts table by Region', () => {
    cy.contains('th', 'Region').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(4).should('contain', 'Stockholm');
    });
    cy.contains('th', 'Region').click();
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(4).should('contain', 'Skåne');
    });
  });

  it('Searches table for "Stockholm"', () => {
    cy.get('input').type('Stockholm');
    cy.get('table tbody tr').each(($row) => { 
      cy.wrap($row).should('contain', 'Stockholm');
    });
  });
});
