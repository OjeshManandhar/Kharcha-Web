// packages
const express = require('express');
const bodyParser = require('body-parser');

// routes
const homeRouter = require('./routes/home');
const tagsRouter = require('./routes/tags');
const recordsRouter = require('./routes/records');

// utils
const path = require('./utils/path');

const app = express();

// request parser
app.use(bodyParser.urlencoded({ extended: false }));

// Static
app.use(express.static(path('public')));

// Routers
app.use('/', homeRouter);
app.use('/tags', tagsRouter);
app.use('/records', recordsRouter);

// 404
app.use((req, res) => {
  res.status(404).sendFile(path('views', '404.html'));
});

app.listen(3000, () => console.log('Server started at port 3000'));
