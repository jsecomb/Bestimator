describe('Canary Test', () => {

    before(() => {
      cy.login();
    })

    it('true should equal true', () => {
      expect(true).to.equal(true)
    })

    it('loads the home page when navigated to', () => {
      cy.visit('')
  
      cy.get('.container')
    })
  })