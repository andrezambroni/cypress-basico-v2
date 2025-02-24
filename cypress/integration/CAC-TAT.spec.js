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

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Andre")
    cy.get("#lastName").type("Zambroni")
    cy.get("#email").type("andre.email.com")
    cy.get("#phone").type("24999999999")
    cy.get("#open-text-area").type(
      "Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste  Mensagem de teste |  Mensagem de teste | Mensagem de teste | Mensagem de teste |",
      { delay: 0 }
    )
    cy.get('button[type="submit"]').click()

    cy.get(".error").should("be.visible")
  })

  it("campo de telefone continua vazio quando preenchido com valor não-numérico", function () {
    cy.get("#phone").type("abcdefg").should("have.value", "")
  })

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Andre")
    cy.get("#lastName").type("Zambroni")
    cy.get("#email").type("andre@email.com")
    cy.get("#phone-checkbox").check() // Marca o checkbox "Telefone"
    cy.get("#phone").should("have.value", "") // Verifica que o campo de telefone está vazio
    cy.get("#open-text-area").type(
      "Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste"
    )
    cy.get('button[type="submit"]').click()

    cy.get(".error").should("be.visible")
  })

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Andre")
      .should("have.value", "Andre")
      .clear()
      .should("have.value", "")

    cy.get("#lastName")
      .type("Zambroni")
      .should("have.value", "Zambroni")
      .clear()
      .should("have.value", "")

    cy.get("#email")
      .type("andre@email.com")
      .should("have.value", "andre@email.com")
      .clear()
      .should("have.value", "")

    cy.get("#phone")
      .type("24999999999")
      .should("have.value", "24999999999")
      .clear()
      .should("have.value", "")
  })

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click()

    cy.get(".error").should("be.visible")
  })

  it("envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get(".success").should("be.visible")
  })

  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube")
  })

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria")
  })

  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog")
  })

  it("marca o tipo de atendimento 'Feedback'", function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback")
  })

  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"][value="ajuda"]').check().should("be.checked")
    cy.get('input[type="radio"][value="elogio"]').check().should("be.checked")
    cy.get('input[type="radio"][value="feedback"]').check().should("be.checked")
  })

  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]').check().should("be.checked")
    cy.get('input[type="checkbox"]').last().uncheck().should("not.be.checked")
  })

  // it("marca ambos checkboxes, depois desmarca o último", function () {
  //   cy.get('input[type="checkbox"]')
  //     .check()
  //     .should("be.checked")
  //     .last()
  //     .uncheck()
  //     .should("not.be.checked")
  // })

  it("seleciona um arquivo da pasta fixtures", function () {
    const fileName = "example.json" // Nome do arquivo na pasta fixtures

    cy.get('input[type="file"]#file-upload')
      .selectFile(`cypress/fixtures/${fileName}`)
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName)
      })
  })

  // Drag-and-drop (arrastar e soltar)
  it("seleciona um arquivo simulando um drag-and-drop", function () {
    const fileName = "example.json" // Nome do arquivo na pasta fixtures

    cy.get('input[type="file"]#file-upload')
      .selectFile(`cypress/fixtures/${fileName}`, { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName)
      })
  })

  it.only("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    const fileName = "example.json"

    cy.fixture(fileName).as("exampleFile")
    cy.get('input[type="file"]#file-upload')
      .selectFile({
        contents: "@exampleFile",
        fileName: fileName,
      })
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName)
      })
  })
})
