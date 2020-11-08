// packages
const express = require('express');

// routes
const homeRouter = require('./routes/home');
const recordsRouter = require('./routes/records');

// utils
const path = require('./utils/path');

const app = express();

// Static
app.use(express.static(path('public')));

// Routers
app.use('/', homeRouter);
app.use('/records', recordsRouter);

// 404
app.use((req, res) => {
  res.status(404).sendFile(path('views', '404.html'));
});

app.listen(3000, () => console.log('Server started at port 3000'));
