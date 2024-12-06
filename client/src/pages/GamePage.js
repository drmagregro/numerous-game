import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const { gameId } = useParams(); // Récupère l'ID de la partie depuis l'URL
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    // Appel à l'API backend pour récupérer les détails de la partie
    fetch(`http://localhost:5001/game/${gameId}`)
      .then((res) => res.json())
      .then((data) => setGameData(data))
      .catch((err) => console.error('Erreur lors de la récupération des données du jeu', err));
  }, [gameId]);

  return (
    <div>
      <h2>Jeu : {gameId}</h2>
      {gameData ? (
        <div>
          <p>Informations sur la partie :</p>
          {/* Affiche ici les informations sur la partie */}
          <p>Nombre de joueurs: {gameData.players.length}</p>
        </div>
      ) : (
        <p>Chargement des données de la partie...</p>
      )}
    </div>
  );
};

export default GamePage;
