import React from 'react';
import { useNavigate } from 'react-router-dom';  // Assure-toi que tu importes useNavigate
import socket from '../socket';  // Importe ta connexion socket

const CreateGameButton = () => {
  const navigate = useNavigate();  // Initialisation de navigate

  const handleCreateGame = () => {
    // Émettre un événement pour créer un jeu
    socket.emit('create-game');

    // Attendre la réponse du serveur pour la création du jeu
    socket.on('game-created', (data) => {
      // Rediriger l'utilisateur vers la page du jeu
      navigate(`/game/${data.gameId}`);  // Utilisation de navigate pour rediriger
    });
  };

  return (
    <button onClick={handleCreateGame}>
      Create Game
    </button>
  );
};

export default CreateGameButton;
