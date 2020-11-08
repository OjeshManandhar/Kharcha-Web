const app = require('express')();

app.use('/', (req, res, next) => {
  res.send('<h1>Express Server</h1>');
});

app.listen(3000, () => console.log('Server started at port 3000'));
