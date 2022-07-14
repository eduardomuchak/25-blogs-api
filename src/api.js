const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./database/middlewares/errorMiddleware');
const loginRoutes = require('./database/routes/loginRoutes');

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
