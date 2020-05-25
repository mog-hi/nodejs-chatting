// 모듈 선언
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var express = require('express');
var app = express();
const indexRouter = require('./routes/index');
const {sequelize} = require('./models');
sequelize.sync();
app.use(express.json());
// 웹서버 생성
var server = http.createServer(app);


// app.get('/', (request, response) => {
//   fs.readFile('HTMLPage.html', (error, data) => {
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.end(data);
//   });
// })
server.listen(3000);

var io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  // message 
  var roomName;
  socket.on('join', (data) => {
    roomName = data;
    socket.join(data);
  })

  socket.on('message', (data) => {
    io.sockets.in(roomName).emit('message', data);
  });
});
app.use('/', indexRouter);
