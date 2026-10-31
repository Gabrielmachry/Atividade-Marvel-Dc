const express = require('express');

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
  res.send('Bem-vindo ao site da Marvel e DC!');
});


app.get('/marvel', (req, res) => {
  res.send('Este é o universo de heróis da Marvel.');
});

app.get('/dc', (req, res) => {
  res.send('Este é o universo de heróis da DC.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
