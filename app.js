const express = require('express');
const product = require('./routes/productRoute');
const sales = require('./routes/salesRoute');
const errorMiddleware = require('./middlewares/errorMiddlewares');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/products', product);

app.use('/sales', sales);

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
