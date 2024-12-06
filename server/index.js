const express = require('express');
const http = require('http'); // Nécessaire pour créer le serveur HTTP
const { Server } = require('socket.io'); // Importer le serveur Socket.io

const app = express();
const server = http.createServer(app); // Crée un serveur HTTP avec Express
const io = new Server(server); // Attache Socket.io au serveur HTTP

// Middleware ou route de base pour tester
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Exemple d'événements personnalisés
    socket.on('create-game', () => {
        console.log('Game created by:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Démarre le serveur
const PORT = 5001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
