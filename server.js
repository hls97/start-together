var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8080;
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
//app.use('/', express.static(__dirname));
//var routes = require("./routes/routes");



http.listen(port);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('start',function(){
      console.log("start")
      io.emit('start');
  })
  socket.on('stop',function(){
            console.log("stop")
      io.emit('stop');
  })
  socket.on('change',function(val){

    var num =val.val
      io.emit('change', num);
  })
});


module.exports = app;
