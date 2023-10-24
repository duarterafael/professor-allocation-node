const express = require('express');
const routes = require('./routes');

const app = express();
const port = 8000;

const cors = require('cors');

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    next();
});

app.use(cors());

routes(app);
app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;