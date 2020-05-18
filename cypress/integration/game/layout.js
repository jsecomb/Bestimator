describe('Viewing Game Page', () => {

    before(() => {
      cy.visit('/auth/logout')
      cy.login()
    })  

    it('should navigate to the game page', () => {
        cy.visit('/game')
    })

  })