describe("Creating a New User Account", () => {
  const NEW_USER = Date.now() + "username";
  const NEW_USER_PASSWORD = "password";

  before(() => {
    cy.visit("/auth/logout");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the signup page", () => {
    cy.visit("/signup");
  });

  it("should signup a new user", () => {
    cy.visit("/signup");
    cy.get("#usernameInput").type(NEW_USER);
    cy.get("#passwordInput").type(NEW_USER_PASSWORD);
    cy.get("#signupButton").click();
    cy.url().should("include", "/game");
  });

  it("should have created a new user", () => {
    cy.request("/api/users").then(response => {
      expect(
        response.body.filter(user => user.username === NEW_USER).length
      ).to.equal(1);
    });
  });

  it("should login and visit game page", () => {
    cy.login();
    cy.visit("/game");
  });
});