// packages
const csrf = require('csurf')();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionStore = require('express-session-sequelize')(session.Store);

// env
require('dotenv').config();

// database
const { sequelize } = require('./database');
const setAssociations = require('./database/associations');

// model
const { User } = require('./models');

// controllers
const errorController = require('./controllers/error');

// routes
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const mainRouter = require('./routes/main');
const tagsRouter = require('./routes/tags');
const recordsRouter = require('./routes/records');

// utils
const { path } = require('./utils/path');

const app = express();

// templating engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path('public')));

// Request parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const SESSION_EXPIRATION = parseInt(process.env.SESSION_EXPIRATION);

// session
const sequelizeSessionStore = new sessionStore({
  db: sequelize,
  // The interval at which to cleanup expired sessions in milliseconds.
  checkExpirationInterval: (SESSION_EXPIRATION / 2) * 60 * 1000,
  // The maximum age (in milliseconds) of a valid session.
  expiration: SESSION_EXPIRATION * 60 * 1000
});
app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sequelizeSessionStore,
    cookie: {
      maxAge: SESSION_EXPIRATION * 60 * 1000 // 1 day
    }
  })
);

// CSRF
app.use(csrf);

// Add local/common values to res
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Find user
app.use((req, res, next) => {
  if (req.session.loggedIn && req.session.userId) {
    User.findByPk(req.session.userId)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.log('Find user error:', err);
        next();
      });
  } else {
    next();
  }
});

// Routers
app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/tags', tagsRouter);
app.use('/records', recordsRouter);

// 404
app.use(errorController.get404);

setAssociations();

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log('Server started at port:', port));
  })
  .catch(err => console.log('Could not sync DB:', err));
