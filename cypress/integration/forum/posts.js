describe('Viewing Forum Page', () => {

    before(() => {
      cy.visit('/auth/logout')
      cy.login()
    })  


    it('should let you submit a new post, and then show it', () => {

        const POST_TITLE = Date.now() + "_Integration_Test";
        const POST_BODY = Date.now() + "_Integration_Test";
        
        cy.visit('/forum')
        cy.get("#title-input").type(POST_TITLE);
        cy.get("#body-input").type(POST_BODY);
        cy.get("button[type='submit']").click();
        cy.url().should('include', '/forum')
        cy.get("#forum-posts").contains(POST_TITLE)
    })

  })