const express = require('express');

const app = express();
const PORT = 3030;

// Dados das empresas e personagens
const empresas = {
  marvel: {
    nome: 'Marvel',
    descricao:
      'A Marvel Comics nasceu em 1939, com o nome Timely Comics, e se tornou uma das maiores editoras de quadrinhos do mundo. ' +
      'É conhecida por heróis com problemas do dia a dia e pelo Universo Cinematográfico Marvel.',
    personagens: [
      { nome: 'Homem de Ferro', identidade: 'Tony Stark', estreia: 1963, descricao: 'Gênio, bilionário e inventor que luta usando uma armadura de alta tecnologia.' },
      { nome: 'Thor', identidade: 'Thor Odinson', estreia: 1962, descricao: 'O deus do trovão de Asgard, que empunha o martelo Mjolnir.' },
      { nome: 'Homem-Aranha', identidade: 'Peter Parker', estreia: 1962, descricao: 'Jovem que ganhou poderes após a picada de uma aranha radioativa.' },
      { nome: 'Capitão América', identidade: 'Steve Rogers', estreia: 1941, descricao: 'Supersoldado da Segunda Guerra Mundial, símbolo de coragem e liderança.' }
    ]
  },
  dc: {
    nome: 'DC',
    descricao:
      'A DC Comics foi fundada em 1934 e publicou alguns dos primeiros super-heróis da história dos quadrinhos. ' +
      'É famosa por personagens icônicos e pela Liga da Justiça.',
    personagens: [
      { nome: 'Batman', identidade: 'Bruce Wayne', estreia: 1939, descricao: 'Detetive de Gotham City que combate o crime com inteligência e tecnologia.' },
      { nome: 'Superman', identidade: 'Clark Kent', estreia: 1938, descricao: 'Último sobrevivente do planeta Krypton, com força e poderes extraordinários.' },
      { nome: 'Mulher-Maravilha', identidade: 'Diana Prince', estreia: 1941, descricao: 'Princesa guerreira amazona de Themyscira.' },
      { nome: 'Flash', identidade: 'Barry Allen', estreia: 1956, descricao: 'O homem mais rápido do mundo, capaz de correr em supervelocidade.' }
    ]
  }
};

// Evita que textos vindos da URL sejam interpretados como HTML
function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Link para a rota de um personagem
function linkPersonagem(chaveEmpresa, personagem) {
  const url = `/personagem/${chaveEmpresa}/${encodeURIComponent(personagem.nome)}`;
  return `<a href="${url}">${personagem.nome}</a>`;
}

// Estrutura HTML comum a todas as páginas
function pagina(titulo, conteudo) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; line-height: 1.6; color: #222; }
    h1 { color: #b11313; }
    a { color: #0b57d0; }
    hr { margin: 24px 0; }
  </style>
</head>
<body>
${conteudo}
</body>
</html>`;
}

// 1. Página inicial
app.get('/', (req, res) => {
  const listaPersonagens = Object.entries(empresas)
    .flatMap(([chave, empresa]) =>
      empresa.personagens.map((p) => `<li>${linkPersonagem(chave, p)} (${empresa.nome})</li>`)
    )
    .join('\n      ');

  res.send(pagina('Catálogo de Heróis', `
  <h1>Catálogo de Heróis</h1>
  <p>Bem-vindo ao catálogo de heróis da Marvel e da DC! Escolha uma empresa ou um personagem para saber mais.</p>

  <h2>Empresas</h2>
  <ul>
    <li><a href="/marvel">Marvel</a></li>
    <li><a href="/dc">DC</a></li>
  </ul>

  <hr>

  <h2>Personagens</h2>
  <ul>
      ${listaPersonagens}
  </ul>
  `));
});

// 2. Rotas das empresas
function paginaEmpresa(chave) {
  const empresa = empresas[chave];
  const lista = empresa.personagens
    .map((p) => `<li>${linkPersonagem(chave, p)}</li>`)
    .join('\n    ');

  return pagina(empresa.nome, `
  <h1>${empresa.nome}</h1>
  <p>${empresa.descricao}</p>

  <h2>Personagens</h2>
  <ul>
    ${lista}
  </ul>

  <p><a href="/">Voltar para a página inicial</a></p>
  `);
}

app.get('/marvel', (req, res) => {
  res.send(paginaEmpresa('marvel'));
});

app.get('/dc', (req, res) => {
  res.send(paginaEmpresa('dc'));
});

// 3. Rota com dois parâmetros obrigatórios
app.get('/personagem/:empresa/:nome', (req, res) => {
  const { empresa, nome } = req.params;

  const dadosEmpresa = empresas[empresa.toLowerCase()];
  const personagem = dadosEmpresa
    ? dadosEmpresa.personagens.find((p) => p.nome.toLowerCase() === nome.toLowerCase())
    : undefined;

  let detalhes;
  if (personagem) {
    detalhes = `
  <ul>
    <li><strong>Identidade:</strong> ${personagem.identidade}</li>
    <li><strong>Primeira aparição:</strong> ${personagem.estreia}</li>
  </ul>
  <p>${personagem.descricao}</p>`;
  } else {
    detalhes = `
  <p>Este personagem ainda não está cadastrado no catálogo.</p>`;
  }

  const linkEmpresa = dadosEmpresa
    ? `<a href="/${empresa.toLowerCase()}">Ver personagens da ${dadosEmpresa.nome}</a> | `
    : '';

  res.send(pagina(`${escaparHTML(nome)} - Catálogo de Heróis`, `
  <h1>${escaparHTML(personagem ? personagem.nome : nome)}</h1>
  <p><strong>Empresa:</strong> ${escaparHTML(dadosEmpresa ? dadosEmpresa.nome : empresa)}</p>
  <p><strong>Personagem:</strong> ${escaparHTML(nome)}</p>
  ${detalhes}

  <p>${linkEmpresa}<a href="/">Voltar para a página inicial</a></p>
  `));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
