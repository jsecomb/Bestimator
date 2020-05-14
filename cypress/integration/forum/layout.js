describe('Viewing Forum Page', () => {

    before(() => {
      cy.visit('/auth/logout')
      cy.login()
    })  

    it('should navigate to the forum page', () => {
        cy.visit('/forum')
    })

    it('should have the list of posts', () => {
        cy.visit('/forum')
        cy.get('#forum-posts')
    })

    it('should have a new post form', () => {
        cy.visit('/forum')
        cy.get('form.forum-post')
    })


  })