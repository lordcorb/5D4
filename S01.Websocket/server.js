import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';
import { existsSync } from 'fs';

const PORT = 1337;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});


//TODO: Connexion des clients
socketServer.on(IOEVENTS.CONNECTION,async (socket) => {
    console.log(socket.id);

    await newUser(socket);

    socket.on(IOEVENTS.SEND,message => {
        const messageToBroadcast = {
            sender: socket.data.identity,
            timestamp: dayjs(),
            text:message.text,
        }

        socketServer.emit(IOEVENTS.RECEIVED, messageToBroadcast);
    });

    socket.on(IOEVENTS.USERNAME, identity => {
        socket.data.identity.name = identity.name;
        sendUserIdentities();
    });

    socket.on(IOEVENTS.DISCONNECT, reason =>{
        console.log(reason);
        sendUserIdentities();
    });
});

async function newUser(socket) {
    const newUser = {
        id:socket.id,
        name:'Anonyme',
        avatar: randomAvatarImage()
    }

    socket.data.identity = newUser;

    await sendUserIdentities();
}


async function sendUserIdentities() {

    const clients = await socketServer.fetchSockets();
    const users = clients.map(c => c.data.identity);

    socketServer.emit(IOEVENTS.USER_ONLINE,users); // À tous les clients

    console.log(users);

}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 8 + 1);
    return `./images/avatar${avatarNumber}.png`;
}