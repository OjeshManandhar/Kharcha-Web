// packages
const express = require('express');
const bodyParser = require('body-parser');

// controllers
const errorController = require('./controllers/error');

// routes
const homeRouter = require('./routes/home');
const tagsRouter = require('./routes/tags');
const recordsRouter = require('./routes/records');

// utils
const { path } = require('./utils/path');

const app = express();

// templating engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// request parser
app.use(bodyParser.urlencoded({ extended: false }));

// Static
app.use(express.static(path('public')));

// Routers
app.use('/', homeRouter);
app.use('/tags', tagsRouter);
app.use('/records', recordsRouter);

// 404
app.use(errorController.get404);

app.listen(3000, () => console.log('Server started at port 3000'));
