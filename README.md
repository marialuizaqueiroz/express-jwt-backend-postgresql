# Backend Node.js (TypeScript) + Express + MongoDB + JWT - MVP

## Como usar

1. Copie `.env.example` para `.env` e ajuste as variáveis.
2. Suba MongoDB local (`docker compose up -d`) ou use sua instância Atlas.
3. `npm install`
4. `npm run dev` para desenvolvimento.
5. Use os scripts em `requests/` ou Postman/Insomnia.

## Estrutura de pastas

Veja `src/` com a separação em camadas: config, database, middlewares, models, services, controllers, routes, utils.

## Scripts de requisição

Há scripts curl em `requests/` cobrindo cenários exigidos pela atividade.
