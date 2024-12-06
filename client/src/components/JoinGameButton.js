import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';  // Assure-toi que tu importes la bonne instance de socket

const JoinGameButton = ({ inputGameId }) => {
  const navigate = useNavigate();  // Nous utilisons useNavigate ici

  const handleJoinGame = () => {
    // Emission de l'événement pour rejoindre le jeu
    socket.emit('join-game', inputGameId);

    // Écouter l'événement "game-joined" pour obtenir la confirmation
    socket.on('game-joined', (data) => {
      // Rediriger vers la page du jeu après avoir rejoint avec succès
      navigate(`/game/${data.gameId}`);
    });
  };

  return (
    <button onClick={handleJoinGame}>
      Join Game
    </button>
  );
};

export default JoinGameButton;
