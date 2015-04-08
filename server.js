var io = require('socket.io')();

io.on('connection', function(socket){

	socket.on('send', function(data){
		socket.broadcast.emit('send', data);
		console.log(data.nickname + ': ' + data.message);
	});

	socket.on('client_connection', function(data){
		console.log('We have a connection from ' + data.nickname  + '.');
		socket.emit('server_message', { message : 'Welcome to our simple chat application, ' + data.nickname });
	});
});


io.listen(3000);
console.log('Listening on port 3000.');
