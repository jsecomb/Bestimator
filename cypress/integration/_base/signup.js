describe("Creating a New User Account", () => {
  const NEW_USER = Date.now() + "@test.com";
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

  it("should signup a new user and navigate to the forum page", () => {
    cy.visit("/signup");
    cy.get("#email-input").type(NEW_USER);
    cy.get("#password-input").type(NEW_USER_PASSWORD);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/forum");
  });

  it("should have created a new user", () => {
    cy.request("/api/users").then(response => {
      expect(
        response.body.filter(user => user.email === NEW_USER).length
      ).to.equal(1);
    });
  });
});