/// <reference types="cypress" />

describe('Navbar Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });
    
    it('Checks that "Create customer" page has navbar with appropriate title', () => {
        cy.contains('Skapa ny kund').click();
        cy.url().should('include', '/skapakund');
        cy.get(`nav`).within(() => {
            cy.get('h2').should('have.text', 'Skapa ny kund');
        });
    });

    it('Checks that "Create order" page has navbar with appropriate title', () => {
        cy.contains('Skapa order').click();
        cy.url().should('include', '/skapaorder');
        cy.get(`nav`).within(() => {
            cy.get('h2').should('have.text', 'Skapa Order');
        });
    });

    it('Checks that "See orders" page has navbar with appropriate title', () => {
        cy.contains('Se ordrar').click();
        cy.url().should('include', '/seordrar');
        cy.get(`nav`).within(() => {
            cy.get('h2').should('have.text', 'Se Ordrar');
        });
    });
});

describe('Hamburger Menu Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Hamburger menu opens and closes', () => {
        cy.contains('Skapa ny kund').click();

        cy.get('nav').within(() => {
            cy.get('button').click();
        });
        cy.get('div.bg-blue-600').should('be.visible');

        cy.get('nav').within(() => {
            cy.get('button').click();
        });
        cy.get('div.bg-blue-600').should('not.be.visible');
    });

    it('"Skapa ny kund" link works', () => {
        cy.contains('Skapa order').click();

        cy.get('nav').within(() => {
            cy.get('button').click();
        });
        
        cy.contains('Skapa ny kund').click();
        cy.url().should('include', '/skapakund');
    });

    it('"Skapa order" link works', () => {
        cy.contains('Skapa ny kund').click();

        cy.get('nav').within(() => {
            cy.get('button').click();
        });
        
        cy.contains('Skapa order').click();
        cy.url().should('include', '/skapaorder');
    });

    it('"Se ordrar" link works', () => {
        cy.contains('Skapa ny kund').click();

        cy.get('nav').within(() => {
            cy.get('button').click();
        });
        
        cy.contains('Se ordrar').click();
        cy.url().should('include', '/seordrar');
    });
});