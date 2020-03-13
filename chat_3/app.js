// 모듈 선언
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var express = require('express');
var app = express();

var multer = require('multer');
const upload = require('./config/multer');
// var path = require('path');var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
//   }
// })
// var upload = multer({ storage: storage })

// 웹서버 생성
var server = http.createServer(app);
app.get('/', (request, response) => {
  fs.readFile('HTMLPage.html', (error, data) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(data);
  });
})
server.listen(52273, () => {
  console.log('Server Running at http://127.0.0.1:52273');
});

//
var io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  // message 
  var roomName = null;

  socket.on('join', (data) => {
    roomName = data;
    socket.join(data);
  })

  socket.on('message', (data) => {
    io.sockets.in(roomName).emit('message', data);
    console.log(data);
  });

  socket.on('image', (data)=>{
    io.sockets.in(roomName).emit('image', data);
    console.log(data);
  })
  
});

app.post( '/image', upload.single("image"), function(req, res, next) {

  try {
   
    // var file = './uploads' + req.file.filename;
    console.log(req.file)

    var data = req.file;
    res.send(data.location);


  } catch (error) {
    console.error(error);
    next(error);
  }
});
