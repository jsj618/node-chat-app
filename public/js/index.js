var socket=io();

socket.on('connect', () => {
    console.log('from client: connected to browser');

    //normally this data would be pulled from a form
    socket.emit('createMessage', {
        from: 'jeff',
        text: 'hi there'
    });
});

socket.on('disconnect', () => { console.log('from client: disconnected to browser'); });

socket.on('newMessage',function(message){
    console.log('newMessage',message);
});

