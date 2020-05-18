describe("Login into the Test User Account", () => {
  const TEST_USER = "username";
  const TEST_USER_PASSWORD = "password";

  beforeEach(() => {
    cy.logout();
    cy.visit("/");
  });

  it("should navigate to login page", () => {
    cy.visit("/login");
  });

  it("login page should have a login form with username and password", () => {
    cy.visit("/login");
    cy.get("#usernameInput").type(TEST_USER);
    cy.get("#passwordInput").type(TEST_USER_PASSWORD);
  });

  it("when a user inputs their credentials, they should be authorized and redirected to the game page", () => {
    cy.visit("/login");
    cy.get("#usernameInput").type(TEST_USER);
    cy.get("#passwordInput").type(TEST_USER_PASSWORD);
    cy.get("#loginButton").click();
    cy.url().should("include", "/game");
  });
});