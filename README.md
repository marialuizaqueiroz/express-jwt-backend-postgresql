# Mini-projeto Backend - API de Autenticação e Tarefas

**Autor(a):** Maria Luiza Queiroz R. L. e Silva
**Curso:** Engenharia de Computação - Senai Cimatec

---

## Link da Aplicação (Produção)

A API está hospedada na Vercel e pode ser acessada através da seguinte URL base:

**[(https://express-jwt-backend-postgresql.marialuiza.me/)]((https://express-jwt-backend-postgresql.marialuiza.me/))**

## Vídeo de Demonstração

Um vídeo curto demonstrando os testes locais, em produção e o teste de segurança pode ser encontrado no link abaixo:

**[(https://www.youtube.com/watch?v=ge0LUZXnZYA)](https://www.youtube.com/watch?v=ge0LUZXnZYA)**

---

## Descrição do Projeto

Esta é uma API RESTful desenvolvida em Node.js, Express e TypeScript, que fornece um sistema completo de autenticação de usuários (cadastro e login) utilizando JSON Web Tokens (JWT) para autorização.

### Funcionalidade Adicionada: CRUD de Tarefas

Como evolução do projeto original, foi implementada uma nova funcionalidade completa de **CRUD (Create, Read, Update, Delete) de Tarefas (To-do List)**.

Esta nova funcionalidade é **totalmente protegida por autenticação**. Um usuário só pode interagir com o sistema de tarefas se enviar um token JWT válido.

O ponto principal da implementação é a **segurança e o isolamento de dados (multi-tenancy)**: um usuário autenticado pode apenas criar, visualizar, editar e deletar as **suas próprias** tarefas. Tentativas de aceder a dados de tarefas de outros usuários (mesmo que o ID da tarefa seja conhecido) resultarão num erro `404 Not Found`, garantindo que os dados de cada usuário sejam privados.

## Funcionalidades Principais

* **Autenticação de Usuários:**
    * `POST /api/register`: Cadastro de novos usuários com hash de senha (BCRYPT).
    * `POST /api/login`: Login de usuários e geração de token JWT.
* **CRUD de Tarefas (Protegido por JWT):**
    * `POST /api/tasks`: Cria uma nova tarefa associada ao usuário logado.
    * `GET /api/tasks`: Lista todas as tarefas *apenas* do usuário logado.
    * `GET /api/tasks?completed=true`: Lista tarefas filtrando por propriedades (ex: completas).
    * `GET /api/tasks/:id`: Busca os detalhes de uma tarefa específica (se ela pertencer ao usuário).
    * `PUT /api/tasks/:id`: Atualiza todos os dados de uma tarefa (se ela pertencer ao usuário).
    * `PATCH /api/tasks/:id`: Atualiza dados parciais de uma tarefa (se ela pertencer ao usuário).
    * `DELETE /api/tasks/:id`: Remove uma tarefa (se ela pertencer ao usuário).

## Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Linguagem:** TypeScript
* **Banco de Dados:** Postgresql (com Prisma)
* **Autenticação:** JSON Web Tokens (JWT)
* **Segurança:** Bcrypt.js (para hashing de senhas)
* **Hospedagem:** Vercel

## Como Testar

Para testar esta API, é recomendado utilizar uma ferramenta como o Postman ou Insomnia.

1.  **Registe um usuário** na rota `POST /api/register`.
2.  **Faça login** na rota `POST /api/login` para obter um token JWT.
3.  **Configure o seu cliente de API** para incluir este token no cabeçalho `Authorization` em todas as requisições futuras (ex: `Authorization: Bearer <seu_token_aqui>`).
4.  **Teste** as rotas de CRUD de `/api/tasks`.

Um ficheiro `requests.yaml` para ser importado no Insomnia está disponível na pasta `/requests` deste repositório, contendo exemplos de todas as requisições de sucesso e de erro.

## Variáveis de Ambiente

Para rodar este projeto localmente, é necessário criar um arquivo `.env` na raiz com as seguintes variáveis:
