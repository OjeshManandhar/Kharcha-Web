// packages
const app = require('express')();

// routes
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// 404
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000, () => console.log('Server started at port 3000'));
