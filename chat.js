var options = {
//    'log level': 0
    },
    port = '8080';
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server, options);
app.use('/', express.static(__dirname + '/'));
server.listen(port, function(){
    console.log('server listen on port: ' + port);
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(client){
    console.log('you are inside of chat');
    client.on('chat message', function(msg){
        client.emit('chat message', msg);
        client.broadcast.emit('all chat message', msg);
    });
});
