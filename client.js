var socket = require('socket.io-client')('http://localhost:3000');
var readline = require('readline');
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
var metal = require('metal-name');


var nickname =  metal();
rl.setPrompt(nickname + ': ');
socket.on('connect', function(){
	socket.emit('client_connection', { nickname: nickname });
});

socket.on('server_message', function(data){
	console_out(data.message);
});

socket.on('send', function(data){
	console_out(data.nickname + ': ' + data.message);
});

rl.on('line', function (line){
	socket.emit('send', { nickname: nickname, message : line });
	rl.prompt(true);
});


function console_out(msg){
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(msg);
	rl.prompt(true);	
}
