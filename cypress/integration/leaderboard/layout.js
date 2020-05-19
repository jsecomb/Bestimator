describe('Viewing Leaderboard Page', () => {

    before(() => {
      cy.visit('/auth/logout')
      cy.login()
    })  

    it('should navigate to the leaderboard page', () => {
        cy.visit('/leaderboard')
    })

  })