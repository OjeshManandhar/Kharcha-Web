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
const setAssociations = require('./database/associations');

// model
const { User } = require('./models');

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

// Add Test user to request
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;

      next();
    })
    .catch(err => console.log('User not found:', err));
});

// Routers
app.use('/', mainRouter);
app.use('/tags', tagsRouter);
app.use('/records', recordsRouter);

// 404
app.use(errorController.get404);

setAssociations();

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ userName: 'Test', password: 'test password' });
    }

    return Promise.resolve(user);
  })
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log('Server started at port:', port));
  })
  .catch(err => console.log('Could not sync DB:', err));
