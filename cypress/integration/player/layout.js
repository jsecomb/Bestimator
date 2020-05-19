describe('Viewing Player Page', () => {

    before(() => {
      cy.visit('/auth/logout')
      cy.login()
    })  

    it('should navigate to the player page', () => {
        cy.visit('/player')
    })

  })