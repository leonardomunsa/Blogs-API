const express = require('express');
require('dotenv').config();
const usersController = require('./controllers/usersControllers');
const loginController = require('./controllers/loginControllers');
const categoriesControllers = require('./controllers/categoriesControllers');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', usersController);
app.use('/login', loginController);
app.use('/categories', categoriesControllers);

app.use(errorHandler);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
