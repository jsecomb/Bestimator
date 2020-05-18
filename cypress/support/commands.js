// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add("login", () => {
    cy.visit('/login');
    cy.get("#usernameInput").type("username");
    cy.get("#passwordInput").type("password");
    cy.get("#loginButton").click();
})

Cypress.Commands.add("logout", () => {
    cy.visit('/auth/logout');
})

