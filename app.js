const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Configuração do MySQL
const connection = require('./db');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota para a página de postagens
app.get('/postagens', (req, res) => {
  // Recupera as postagens do banco de dados
  connection.query('SELECT * FROM postagens', (err, results) => {
    if (err) throw err;
    res.render('postagens', { postagens: results });
  });
});

// Rota para o formulário de criação de postagens
app.get('/criar-postagem', (req, res) => {
  res.render('criar-postagem');
});

// Rota para lidar com a criação de postagens
app.post('/criar-postagem', (req, res) => {
  const { nome, conteudo } = req.body;

  // Insere a postagem no banco de dados
  connection.query(
    'INSERT INTO postagens (nome, conteudo, curtidas) VALUES (?, ?, ?)',
    [nome, conteudo, 0],
    (err) => {
      if (err) throw err;
      res.redirect('/postagens');
    }
  );
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
