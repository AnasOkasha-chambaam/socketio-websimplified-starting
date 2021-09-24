const webSocketIo = require('socket.io')(3080);

webSocketIo.on('connection',socket => {
    console.log(socket.id);
})

console.log('Hi');