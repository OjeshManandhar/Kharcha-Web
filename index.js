// packages
const app = require('express')();

// routes
const indexRouter = require('./routes/index');

// utils
const path = require('./utils/path');

app.use('/', indexRouter);

// 404
app.use((req, res) => {
  res.status(404).sendFile(path('views', '404.html'));
});

app.listen(3000, () => console.log('Server started at port 3000'));
