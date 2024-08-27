/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach( function(){
        cy.visit('./src/index.html')
    }
    )
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preencher os blocos obrigatorio', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        cy.get('#firstName').type('Renato')
        cy.get('#lastName').type('Schipper')
        cy.get('#email').type('renattoschipper@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})     
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Renato')
        cy.get('#lastName').type('Schipper')
        cy.get('#email').type('renattoschipper,gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não-numerico', function(){
        cy.get('#phone').type('abcdefghij').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Renato')   
        cy.get('#lastName').type('Schipper')
        cy.get('#email').type('renattoschipper@gmail.com')
        cy.get('#check > [for="phone"]').click()
        cy.get('#phone-checkbox').type('Teste')    
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error').should('be.visible')
    })
    it('preencher e limpar os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Renato') 
            .should('have.value' ,'Renato')
            .clear()
            .should('have.value' ,'')
        cy.get('#lastName')
            .type('Schipper') 
            .should('have.value' ,'Schipper')
            .clear()
            .should('have.value' ,'')
        cy.get('#email')    
            .type('renattoschipper@gmail.com')
            .should('have.value' ,'renattoschipper@gmail.com')
            .clear()
            .should('have.value' ,'')
        cy.get('#phone')   
            .type('12345679')
            .should('have.value' ,'12345679')
            .clear()
            .should('have.value' ,'')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        //cy.fillMandatoryFieldsAndSubmit()
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it.only('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
  })
  