describe('Login into the Test User Account', () => {

    const TEST_USER = 'test@test.com'
    const TEST_USER_PASSWORD = 'password'

    beforeEach(() => {
      cy.logout();
      cy.visit('/');
    })

    it('should navigate to the login page', () => {
        cy.visit('/login')
    })

    it('login page should have a login form with email and password', () => {
      cy.visit('/login');
      cy.get("#email-input").type(TEST_USER);
      cy.get("#password-input").type(TEST_USER_PASSWORD);
    })

    it('when a user inputs their credentials, they should be authorized and redirected to the forum page', () => {
      cy.visit('/login');
      cy.get("#email-input").type(TEST_USER);
      cy.get("#password-input").type(TEST_USER_PASSWORD);
      cy.get("button[type='submit']").click();
      cy.url().should('include', '/forum')
    })
  })