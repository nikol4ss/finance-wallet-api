API de Gestão Financeira (com regras reais)

Contexto técnico
Controle de receitas/despesas com categorização, recorrência e consolidação mensal.

Por que é forte
Todo mundo faz CRUD disso. Poucos fazem bem modelado.

Escopo em 6 dias

Auth (JWT)
CRUD de transações
Categorias
Recorrência (mensal)
Resumo mensal (agregações SQL)

Diferencial técnico

Modelagem correta de recorrência (não duplicar registros)
Query otimizada para resumo (GROUP BY + indexes)
Idempotência em criação de transações

wallet-api/
  src/
    app.ts
    server.ts

    modules/
    shared/

  tests/

  package.json
  tsconfig.json
  pnpm-lock.yaml

  .env
  .env.example

  .eslintrc.cjs
  .prettierrc

  docker-compose.yml
  Dockerfile

  README.md
