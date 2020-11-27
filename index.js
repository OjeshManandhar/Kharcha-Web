// packages
const express = require('express');
const bodyParser = require('body-parser');

// env
require('dotenv').config();

// controllers
const errorController = require('./controllers/error');

// routes
const mainRouter = require('./routes/main');
const tagsRouter = require('./routes/tags');
const recordsRouter = require('./routes/records');

// database
const { sequelize } = require('./database');

// utils
const { path } = require('./utils/path');

const app = express();

// templating engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// Static
app.use(express.static(path('public')));

// request parser
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use('/', mainRouter);
app.use('/tags', tagsRouter);
app.use('/records', recordsRouter);

// 404
app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log('Server started at port 3000'));
  })
  .catch(err => console.log('Could not sync DB'));
