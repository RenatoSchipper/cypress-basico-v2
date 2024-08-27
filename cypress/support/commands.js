Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        
    cy.get('#firstName').type('Renato')
       
        cy.get('#lastName').type('Schipper')

        cy.get('#email').type('renattoschipper@gmail.com')

        cy.get('#open-text-area').type('Teste')
       
       // cy.contains('button', 'Enviar')
       //     .click()
})