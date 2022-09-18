const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const getFormattedMessage =  require("./messageHelper");
const {addUser, getUser,removeUser, getRoomUsers} =  require("./userHelper");


const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        // methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true
      }
});

const botName = "Chatty"

// Run when client connect
io.on("connection", socket => {

    socket.on("joinRoom", (user) => {
        socket.join(user.roomId);
        user.socketId = socket.id;
        addUser(user);
        //Welcom current user
        socket.emit("message", getFormattedMessage(botName, 'bot', "Welcome to code share messaging"));

        //Broadcast when user connects
        socket.broadcast.to(user.roomId).emit('message', getFormattedMessage(botName, 'bot', `${user.fullName} has joined the chat`));

        //Send users and room info
        io.to(user.roomId).emit('roomUsers', {
            roomId: user.roomId,
            users: getRoomUsers(user.roomId)
        });
    });

    //Listen for chatMessage
    socket.on('chatMessage', payload => {
        var user = getUser(payload.userId);
        io.to(user.roomId).emit("message", getFormattedMessage(user.fullName, user.avatar, payload.text));
    });

    //Listen for codeUpdated
    socket.on('codeUpdated', payload => {
        var user = getUser(payload.userId);
        socket.broadcast.to(user.roomId).emit("codeUpdated", getFormattedMessage(user.fullName,user.avatar, payload.text));
    });

    //Run when client disconnect
    socket.on("disconnect", () => {
        var user = removeUser(socket.id);
        if(user) {
            io.to(user.roomId).emit("message", getFormattedMessage(botName, 'bot', `${user.fullName} has left the chat`));

            //Send users and room info
            io.to(user.roomId).emit('roomUsers', {
                roomId: user.roomId,
                users: getRoomUsers(user.roomId)
            });
        }
    })
});


const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
