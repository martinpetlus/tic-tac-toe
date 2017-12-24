require('module-alias/register');
require('babel-register')({
  plugins: ['transform-es2015-modules-commonjs'],
});

const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));

const io = require('socket.io')(server);

io.on('connection', require('./controllers'));

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('TicTacToe app listening on port 3001!');
});
