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
    socket.on('room', function(room) {
        console.log('room joined: '+room)
        socket.join(room);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('start',function(val){

        var lobby = val.lobby;
        io.sockets.in(lobby).emit('start');
    })
    socket.on('stop',function(val){

        var lobby = val.lobby;
        io.sockets.in(lobby).emit('stop');
    })
    socket.on('change',function(val){

        var lobby = val.lobby;
        var num =val.val
        io.sockets.in(lobby).emit('change', num);
    })
});


module.exports = app;
