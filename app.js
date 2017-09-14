const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  // 让options请求快速返回
  if (req.method === 'OPTIONS') res.send(200);
  else next();
});

// 路由
Object.keys(routes).forEach((key) => {
  app.use(key, routes[key]);
}, this);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

const server = app.listen(8082, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
