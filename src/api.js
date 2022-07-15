const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./database/middlewares/errorMiddleware');
const categoryRoutes = require('./database/routes/categoryRoutes');
const loginRoutes = require('./database/routes/loginRoutes');
const userRoutes = require('./database/routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
