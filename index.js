const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersControllers');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', usersController);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
