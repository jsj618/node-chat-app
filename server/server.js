const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');


const publicPath=path.join(__dirname,'/../public');


const port=process.env.PORT || 3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('from server: new user connected..');

   /*  socket.emit('newMessage', {
        from: 'bill',
        text: 'hey',
        createAt: 123
    }); */ 

    //welcome message from admin to new user
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to chat',
        createdAt: new Date().getTime()
    });

    //broadcast to all users that someone new has joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined chat',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage',(message)=>{
        console.log('createMessage', message);
       /*  io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect',()=>{
        console.log('from server: server disconnected');
    });
});


server.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});