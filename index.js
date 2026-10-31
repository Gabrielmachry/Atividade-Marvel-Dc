const express = require('express');

const app = express();
const PORT = 3000;

// 1. Rota simples com mensagem
app.get('/', (req, res) => {
  res.send('Bem-vindo ao site da Marvel e DC!');
});

// 2. Cada universo na sua rota
app.get('/marvel', (req, res) => {
  res.send('Este é o universo de heróis da Marvel.');
});

app.get('/dc', (req, res) => {
  res.send('Este é o universo de heróis da DC.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
