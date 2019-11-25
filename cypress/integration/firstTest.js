/// <reference types="cypress" />
describe('Cypress First Test', () => {
    it('It should have header', () => {
        cy.visit(`/auth/signin`)

        // cy.get(`[data-testcy="loginForm"]`)
            // .should('have.text', 'Search')
            cy.focused().should('have.data-testcy', 'loginForm')
    });
})