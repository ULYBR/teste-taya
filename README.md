# TAYA BACKEND HOMEWORK

💫 Bem-vindo(a)! 🎉

Este exercício de back-end envolve a criação de um aplicativo Node.js/NestJS que fornecerá uma API REST para controle de crédito. Esperamos que você dedique cerca de 3 horas para implementar este recurso.

## Modelos de Dados

> **Todos os modelos estão definidos em src/model.js**

### Customer (cliente)

Um cliente pode ter uma proposta;
Cada cliente possui um saldo.

### Proposal (proposta)

Uma proposta para um cliente, cadastrado por um usuário.
A proposta têm 3 status: PENDING, REFUSED, ERROR, SUCCESSFUL.
propostas são ativas apenas no status PENDING.

### User (usuário)

Usuários cadastram clientes e criam propostas.

## Configuração Inicial

O exercício requer [Node.js](https://nodejs.org/en/) 16. Recomendamos a versão LTS.

1. Crie um repositório local para este projeto.

1. No diretório raiz, execute `npm install` para coletar todas as dependências.

1. Garanta que o nest esteja instalado na sua maquina executando, `npm i -g @nestjs/cli`.

1. Use, `npm run migration:run` para popular o banco de dados SQLite local. **Alerta: Isso eliminará o banco de dados se ele existir**. O banco de dados fica no arquivo `database.sqlite3`.

1. Execute `npm run start:dev` para iniciar o servidor.

❗️ **Certifique-se de commitar todas as alterações na branch master!**

## Notas Técnicas

- O provedor de banco de dados é o SQLite, que armazenará os dados em um arquivo local no seu repositório chamado database.sqlite3. Você só precisará interagir com o ORM [TypeORM](https://typeorm.io/) - **por favor, dedique algum tempo para ler a documentação do TypeORM antes de começar o exercício.**

- Para autenticar usuários, utilize o middleware getProfile que está localizado em ./get-user-middleware.ts. Os usuários são autenticados passando `user_id` no cabeçalho da solicitação. Após um usuário ser autenticado, seu perfil estará disponível em `req.user`.
- O servidor roda na porta 3005.

## APIs a Implementar

Abaixo está uma lista das APIs necessárias para o aplicativo.

1. **_GET_** `/proposals/:id` - Corrigir a API para retornar a proposta apenas se pertencer ao user que está chamando.✅

1. **_GET_** `/proposals` - Retorna lista de proposals pendentes de um user.✅

1. **_GET_** `/proposals/refused` - Obter propostas rejeitadas criadas por um user.✅

1. **_POST_** `/proposals/:proposal_id/approve` - Dado uma proposta pendente, aprovar a proposta por id, retornar a proposta atualizada, valor do profit deve ser credita no usuario que executou a operacao.✅

1. **_GET_** `/admin/profit-by-status` - Retorna a soma do profit de todas as propostas por usuario agrupada por status.✅

1. **_GET_** `/admin/best-users?start=<date>&end=<date>` - Retorna os users que possuem o maior profit de propostas em sucesso vinculado.⛔

```
 [
    {
        "id": 1,
        "fullName": "Rehan Howe",
        "totalProposal" : 100.3
    },
    {
        "id": 2,
        "fullName": "Milo Wright",
        "totalProposal" : 99
    },
    {
        "id": 3,
        "fullName": "Freyja Long",
        "totalProposal" : 21
    }
]
```

## Indo Além dos Requisitos

Dada a expectativa de tempo deste exercício, não esperamos que alguém entregue algo muito sofisticado, mas se você encontrar tempo extra, qualquer item adicional que destaque suas habilidades únicas seria incrível! 🙌

Seria ótimo, por exemplo, se você escrevesse alguns testes unitários ou uma demonstração simples no frontend mostrando chamadas para suas novas APIs.

## Enviando a Tarefa

Quando você terminar a tarefa, compacte o seu repositório (certifique-se de incluir a pasta .git) e nos envie o arquivo zipado.

Obrigado e boa sorte! 🙏


# Entrega

Este projeto é para fins de avaliação de habilidades.

## Como Usar

1. Clone este repositório.
    ```bash
        https://github.com/ULYBR/teste-taya.git
    ```
2. Instale as dependências:
    ```bash
        npm install
    ```

## Autenticação

A autenticação é realizada através de um Bearer Token. Para acessar as rotas, você deve passar o ID do usuário no token. Certifique-se de que o token é incluído no cabeçalho da solicitação como `Authorization: Bearer <token>`.
## Alteração
- os endpoint `/proposals/refused` e `/proposals` foi alterado `/proposals`: só passar params status com o tipo do status que queira filtrar para retorna os dados.
- implementação de váriavel de ambiente, caso usuário queira usar só altera o arquivo `env.example` para `.env`.
## Rotas

### Usuários

- **POST** `/users`
  - Cria um novo usuário.
  - **Exemplo de Request:**
    ```json
    {
      "name": "John Doe",
      "balance": 1000
    }
    ```

- **GET** `/users`
  - Retorna todos os usuários.

- **GET** `/users/:id`
  - Retorna um usuário específico pelo ID.

- **PUT** `/users/:id`
  - Atualiza um usuário específico pelo ID.
  - **Exemplo de Request:**
    ```json
    {
      "name": "Jane Doe",
      "balance": 1500
    }
    ```

- **DELETE** `/users/:id`
  - Remove um usuário específico pelo ID.

### Clientes

- **POST** `/customers`
  - Cria um novo cliente.
  - **Exemplo de Request:**
    ```json
    {
      "name": "Alice Smith",
      "cpf": "123.456.789-00"
    }
    ```

### Propostas

- **POST** `/proposals`
  - Cria uma nova proposta.
  - **Exemplo de Request:**
    ```json
    {
      "status": "PEDING",
      "profit": 500
    }
    ```

- **GET** `/proposals/:id`
  - Retorna uma proposta específica pelo ID.

- **GET** `/proposals?status=PENDING`
  - Retorna todas as propostas filtradas pelo status.

- **POST** `/proposals/:proposal_id/approve`
  - Aprova uma proposta específica pelo ID.

- **PATCH** `/proposals/:id`
  - Atualiza uma proposta específica pelo ID.
  - **Exemplo de Request:**
    ```json
    {
      "status": "PEDING",
      "profit": 500
    }
    ```

- **DELETE** `/proposals/:id`
  - Remove uma proposta específica pelo ID.

### Profit by Status (Admin)

- **GET** `/admin/profit-by-status`
  - Retorna a soma do lucro das propostas agrupadas por status para todos os usuários.

## Como Usar

1. Clone este repositório.
    ```bash
        https://github.com/ULYBR/teste-taya.git
    ```
2. Instale as dependências:
    ```bash
        npm install
    ```
# Melhorias do projeto que não deu tempo mais foi levantando

- vez de ser authenticado pelo userId, implementar jwt auth na aplicação para maior segurança.
- implementação de variáveis de ambiente para não dá acesso as conexão com string de banco de dados ou variaveis que não poderia ser vista.

## Licença

Você pode encontrar mais informações sobre a licença deste projeto em [LICENSE.md](LICENSE.md).