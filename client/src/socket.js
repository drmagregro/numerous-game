import { io } from 'socket.io-client';

const socket = io('http://localhost:5001'); // URL du serveur
export default socket;
