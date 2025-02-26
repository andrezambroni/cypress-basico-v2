# Projeto de Testes Automatizados - Curso Cypress Básico

Este projeto contém testes automatizados para a aplicação "Central de Atendimento ao Cliente TAT", desenvolvidos durante o curso básico de Cypress da Escola Talking About Testing.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
- [git](https://git-scm.com/)

## Instalação

Siga os passos abaixo para clonar o repositório e instalar as dependências do projeto:

1. Clone o repositório:

   ```sh
   git clone https://github.com/wlsf82/cypress-basico-v2.git

2. Navegue até o diretório do projeto:

   ```sh
   cd cypress-basico-v2

3. Instale as dependências:
   ```sh
   npm install

## Executando os Testes

#### Modo Interativo   
Para abrir o Cypress em modo interativo, execute o comando abaixo:

   ```sh
   npm run cy:open
```

#### Modo Headless
Para rodar os testes em modo headless, simulando um dispositivo móvel com 410 pixels de largura e 860 pixels de altura, execute o comando abaixo:

   ```sh
   npm run cy:run:mobile
```

### Estrutura do Projeto
integration: Contém os arquivos de especificação dos testes.   
fixtures: Contém arquivos de dados estáticos usados nos testes.   
support: Contém comandos customizados e configurações adicionais.   


