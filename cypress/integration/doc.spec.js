/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  // Executa antes de cada teste, visitando a página inicial
  beforeEach(function () {
    cy.visit("./src/index.html")
  })

  // Verifica o título da aplicação
  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
  })

  // Preenche os campos obrigatórios e envia o formulário
  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName").type("Andre") // Preenche o campo de nome
    cy.get("#lastName").type("Zambroni") // Preenche o campo de sobrenome
    cy.get("#email").type("andre@email.com") // Preenche o campo de email
    cy.get("#phone").type("24999999999") // Preenche o campo de telefone
    cy.get("#open-text-area").type(
      "Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste  Mensagem de teste |  Mensagem de teste | Mensagem de teste | Mensagem de teste |",
      { delay: 0 }
    ) // Preenche o campo de texto aberto
    cy.get('button[type="submit"]').click() // Clica no botão de enviar

    cy.get(".success").should("be.visible") // Verifica se a mensagem de sucesso está visível
  })

  // Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Andre") // Preenche o campo de nome
    cy.get("#lastName").type("Zambroni") // Preenche o campo de sobrenome
    cy.get("#email").type("andre.email.com") // Preenche o campo de email com um formato inválido
    cy.get("#phone").type("24999999999") // Preenche o campo de telefone
    cy.get("#open-text-area").type(
      "Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste  Mensagem de teste |  Mensagem de teste | Mensagem de teste | Mensagem de teste |",
      { delay: 0 }
    ) // Preenche o campo de texto aberto
    cy.get('button[type="submit"]').click() // Clica no botão de enviar

    cy.get(".error").should("be.visible") // Verifica se a mensagem de erro está visível
  })

  // Campo de telefone continua vazio quando preenchido com valor não-numérico
  it("campo de telefone continua vazio quando preenchido com valor não-numérico", function () {
    cy.get("#phone").type("abcdefg").should("have.value", "") // Preenche o campo de telefone com caracteres não-numéricos e verifica se continua vazio
  })

  // Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Andre") // Preenche o campo de nome
    cy.get("#lastName").type("Zambroni") // Preenche o campo de sobrenome
    cy.get("#email").type("andre@email.com") // Preenche o campo de email
    cy.get("#phone-checkbox").check() // Marca o checkbox "Telefone"
    cy.get("#phone").should("have.value", "") // Verifica que o campo de telefone está vazio
    cy.get("#open-text-area").type(
      "Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste"
    ) // Preenche o campo de texto aberto
    cy.get('button[type="submit"]').click() // Clica no botão de enviar

    cy.get(".error").should("be.visible") // Verifica se a mensagem de erro está visível
  })

  // Preenche e limpa os campos nome, sobrenome, email e telefone
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Andre") // Preenche o campo de nome
      .should("have.value", "Andre") // Verifica se o campo de nome foi preenchido corretamente
      .clear() // Limpa o campo de nome
      .should("have.value", "") // Verifica se o campo de nome foi limpo

    cy.get("#lastName")
      .type("Zambroni") // Preenche o campo de sobrenome
      .should("have.value", "Zambroni") // Verifica se o campo de sobrenome foi preenchido corretamente
      .clear() // Limpa o campo de sobrenome
      .should("have.value", "") // Verifica se o campo de sobrenome foi limpo

    cy.get("#email")
      .type("andre@email.com") // Preenche o campo de email
      .should("have.value", "andre@email.com") // Verifica se o campo de email foi preenchido corretamente
      .clear() // Limpa o campo de email
      .should("have.value", "") // Verifica se o campo de email foi limpo

    cy.get("#phone")
      .type("24999999999") // Preenche o campo de telefone
      .should("have.value", "24999999999") // Verifica se o campo de telefone foi preenchido corretamente
      .clear() // Limpa o campo de telefone
      .should("have.value", "") // Verifica se o campo de telefone foi limpo
  })

  // Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.get('button[type="submit"]').click() // Clica no botão de enviar sem preencher os campos obrigatórios

    cy.get(".error").should("be.visible") // Verifica se a mensagem de erro está visível
  })

  // Envia o formulário com sucesso usando um comando customizado
  it("envia o formulário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit() // Usa um comando customizado para preencher os campos obrigatórios e enviar o formulário

    cy.get(".success").should("be.visible") // Verifica se a mensagem de sucesso está visível
  })

  // Seleciona um produto (YouTube) por seu texto
  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube") // Seleciona o produto "YouTube" pelo texto e verifica se o valor está correto
  })

  // Seleciona um produto (Mentoria) por seu valor (value)
  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria") // Seleciona o produto "Mentoria" pelo valor e verifica se o valor está correto
  })

  // Seleciona um produto (Blog) por seu índice
  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog") // Seleciona o produto "Blog" pelo índice e verifica se o valor está correto
  })

  // Marca o tipo de atendimento 'Feedback'
  it("marca o tipo de atendimento 'Feedback'", function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check() // Marca o rádio button "Feedback"
      .should("have.value", "feedback") // Verifica se o valor do rádio button está correto
  })

  // Marca cada tipo de atendimento
  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"][value="ajuda"]').check().should("be.checked") // Marca o rádio button "Ajuda" e verifica se está marcado
    cy.get('input[type="radio"][value="elogio"]').check().should("be.checked") // Marca o rádio button "Elogio" e verifica se está marcado
    cy.get('input[type="radio"][value="feedback"]').check().should("be.checked") // Marca o rádio button "Feedback" e verifica se está marcado
  })

  // Marca ambos checkboxes, depois desmarca o último
  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]').check().should("be.checked") // Marca ambos checkboxes e verifica se estão marcados
    cy.get('input[type="checkbox"]').last().uncheck().should("not.be.checked") // Desmarca o último checkbox e verifica se está desmarcado
  })

  // Seleciona um arquivo da pasta fixtures
  it("seleciona um arquivo da pasta fixtures", function () {
    const fileName = "example.json" // Nome do arquivo na pasta fixtures

    cy.get('input[type="file"]#file-upload')
      .selectFile(`cypress/fixtures/${fileName}`) // Seleciona o arquivo
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName) // Verifica se o nome do arquivo está correto
      })
  })

  // Seleciona um arquivo simulando um drag-and-drop
  it("seleciona um arquivo simulando um drag-and-drop", function () {
    const fileName = "example.json" // Nome do arquivo na pasta fixtures

    cy.get('input[type="file"]#file-upload')
      .selectFile(`cypress/fixtures/${fileName}`, { action: "drag-drop" }) // Seleciona o arquivo simulando um drag-and-drop
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName) // Verifica se o nome do arquivo está correto
      })
  })

  // Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    const fileName = "example.json" // Nome do arquivo na pasta fixtures

    cy.fixture(fileName).as("exampleFile") // Carrega a fixture e a associa a um alias
    cy.get('input[type="file"]#file-upload')
      .selectFile({
        contents: "@exampleFile",
        fileName: fileName,
      }) // Seleciona o arquivo utilizando o alias
      .should((input) => {
        expect(input[0].files[0].name).to.equal(fileName) // Verifica se o nome do arquivo está correto
      })
  })

  // Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank") // Verifica se o link possui o atributo target="_blank"
  })

  // Acessa a página da política de privacidade removendo o target e então clicando no link
  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click() // Remove o atributo target e clica no link

    cy.url().should("include", "privacy.html") // Verifica se a URL inclui "privacy.html"
  })

  // Testa a página da política de privacidade de forma independente
  it("testa a página da política de privacidade de forma independente", function () {
    cy.visit("./src/privacy.html") // Visita diretamente a página de política de privacidade

    cy.contains("Talking About Testing").should("be.visible") // Verifica se o texto "Talking About Testing" está visível na página
  })
})


// Comandos do Cypress

// cy.get(selector)
// Descrição: Seleciona um ou mais elementos DOM usando um seletor CSS.
// Exemplo: cy.get("#firstName") seleciona o elemento com o ID firstName.

// cy.type(text)
// Descrição: Digita o texto especificado no elemento selecionado.
// Exemplo: cy.get("#firstName").type("Andre") digita "Andre" no campo de texto com o ID firstName.

// cy.should(assertion, value)
// Descrição: Faz uma asserção sobre o estado do elemento selecionado.
// Exemplo: cy.get("#firstName").should("have.value", "Andre") verifica se o campo de texto com o ID firstName tem o valor "Andre".

// cy.select(valueOrTextOrIndex)
// Descrição: Seleciona uma opção em um elemento <select> usando o valor, texto ou índice.
// Exemplo: cy.get("#product").select("YouTube") seleciona a opção "YouTube" no elemento <select> com o ID product.

// cy.expect(value)
// Descrição: Faz uma asserção sobre um valor. Usado dentro de .should() para verificar valores específicos.
// Exemplo: expect(input[0].files[0].name).to.equal(fileName) verifica se o nome do arquivo selecionado é igual a fileName.

// cy.contains(text)
// Descrição: Seleciona um elemento que contém o texto especificado.
// Exemplo: cy.contains("Talking About Testing") seleciona um elemento que contém o texto "Talking About Testing".

// cy.click()
// Descrição: Clica no elemento selecionado.
// Exemplo: cy.get('button[type="submit"]').click() clica no botão de enviar.

// cy.clear()
// Descrição: Limpa o valor do campo de entrada selecionado.
// Exemplo: cy.get("#firstName").clear() limpa o campo de texto com o ID firstName.

// cy.check()
// Descrição: Marca um checkbox ou rádio button.
// Exemplo: cy.get("#phone-checkbox").check() marca o checkbox com o ID phone-checkbox.

// cy.uncheck()
// Descrição: Desmarca um checkbox.
// Exemplo: cy.get('input[type="checkbox"]').last().uncheck() desmarca o último checkbox.

// cy.selectFile(filePath, options)
// Descrição: Seleciona um arquivo para upload.
// Exemplo: cy.get('input[type="file"]#file-upload').selectFile('cypress/fixtures/example.json') seleciona o arquivo example.json para upload.

// cy.invoke(method, args)
// Descrição: Invoca um método no elemento selecionado.
// Exemplo: cy.get("#privacy a").invoke("removeAttr", "target") remove o atributo target do link.

// cy.url()
// Descrição: Obtém a URL atual da página.
// Exemplo: cy.url().should("include", "privacy.html") verifica se a URL atual inclui "privacy.html".

// cy.visit(url)
// Descrição: Visita a URL especificada.
// Exemplo: cy.visit("./src/privacy.html") visita a página privacy.html.

// Exemplo de Uso no Código
// Aqui está um exemplo de como esses comandos são usados no código:

// it("preenche os campos obrigatórios e envia o formulário", function () {
//   cy.get("#firstName").type("Andre") // Seleciona o campo de texto com o ID `firstName` e digita "Andre"
//   cy.get("#lastName").type("Zambroni") // Seleciona o campo de texto com o ID `lastName` e digita "Zambroni"
//   cy.get("#email").type("andre@email.com") // Seleciona o campo de texto com o ID `email` e digita "andre@email.com"
//   cy.get("#phone").type("24999999999") // Seleciona o campo de texto com o ID `phone` e digita "24999999999"
//   cy.get("#open-text-area").type(
//     "Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste | Mensagem de teste  Mensagem de teste |  Mensagem de teste | Mensagem de teste | Mensagem de teste |",
//     { delay: 0 }
//   ) // Seleciona o campo de texto com o ID `open-text-area` e digita uma mensagem longa
//   cy.get('button[type="submit"]').click() // Seleciona o botão de enviar e clica nele

//   cy.get(".success").should("be.visible") // Seleciona o elemento com a classe `success` e verifica se está visível
// })

