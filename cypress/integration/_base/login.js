describe("Login to User Account", () => {

  const TEST_USER = "username";
  const TEST_USER_PASSWORD = "password";

  beforeEach(() => {
    cy.logout();
    cy.visit("/");
  });

  it("should navigate to the login page", () => {
    cy.visit("/login");
  });

  it("when a user inputs their credentials, they should be authorized", () => {
    cy.visit("/login");
    cy.get("#usernameInput").type(TEST_USER);
    cy.get("#passwordInput").type(TEST_USER_PASSWORD);
    cy.get("#loginButton").click();
  });

  it("should login and visit the game page", () => {
    cy.login();
    cy.visit("/game");
  });
});