# Catálogo de Heróis – Node.js e Express

Aplicação em Node.js + Express que apresenta as empresas Marvel e DC e seus personagens, retornando páginas HTML com `res.send()` e usando parâmetros de rota com `req.params`.

## Como executar

```bash
npm install
npm start
```

O servidor sobe em http://localhost:3030.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com links para as empresas e os personagens |
| `/marvel` | Página da Marvel com a lista de personagens |
| `/dc` | Página da DC com a lista de personagens |
| `/personagem/:empresa/:nome` | Página do personagem, usando os parâmetros `empresa` e `nome` |

Exemplos:

- http://localhost:3030/personagem/marvel/Thor
- http://localhost:3030/personagem/dc/Batman
