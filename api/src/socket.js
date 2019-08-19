let SocketIO = require('socket.io');

module.exports = (server)=>{
    const io = SocketIO(server);
    io.on('connection', (socket) => {
        const req = socket.request;
        const ip =req.headers['x-forwarded-for']||req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속',ip,socket.id,req.ip);
 
        socket.on('disconnect', function(){
          io.emit('users-changed', {user: socket.username, event: 'left'});   
        });
       
        socket.on('set-name', (name) => {
          socket.username = name;
          io.emit('users-changed', {user: name, event: 'joined'});    
        });
        
        socket.on('send-message', (message) => {
          io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
        });
      });
}