/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html")
  })

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
  })

  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("Andre")
    cy.get("#lastName").type("Zambroni")
    cy.get("#email").type("andre@email.com")
    cy.get("#phone").type("24999999999")
    cy.get("#open-text-area").type(
      "Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste  Mensagem de teste |  Mensagem de teste | Mensagem de teste | Mensagem de teste |",
      { delay: 0 }
    )
    cy.get('button[type="submit"]').click()

    cy.get(".success").should("be.visible")
  })
})
