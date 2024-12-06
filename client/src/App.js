import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import socket from './socket';
import CreateGameButton from './components/CreateGameButton';
import JoinGameButton from './components/JoinGameButton';
import GamePage from './pages/GamePage';  // Assure-toi d'avoir ce composant

function App() {
  const [gameId, setGameId] = useState(null);
  const [inputGameId, setInputGameId] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('game-created', (data) => {
      setGameId(data.gameId);
      alert(`Game created! Share this ID: ${data.gameId}`);
    });

    socket.on('game-joined', (data) => {
      setGameId(data.gameId);
    });

    socket.on('player-joined', (data) => {
      setPlayers(data.players);
    });

    return () => {
      socket.off('game-created');
      socket.off('game-joined');
      socket.off('player-joined');
    };
  }, []);

  const createGame = () => {
    socket.emit('create-game');
  };

  return (
    <Router>
      <div>
        <h1>Numerous</h1>
        {gameId ? (
          <>
            <h2>Game ID: {gameId}</h2>
            <p>Players in this game:</p>
            <ul>
              {players.map((player) => (
                <li key={player}>{player}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <button onClick={createGame}>Create Game</button>
            <div>
              <input
                type="text"
                placeholder="Enter Game ID"
                value={inputGameId}
                onChange={(e) => setInputGameId(e.target.value)}
              />
              <JoinGameButton inputGameId={inputGameId} />
            </div>
            <div>
              <CreateGameButton />
            </div>
          </>
        )}
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/game/:gameId" element={<GamePage />} />  {/* La page du jeu */}
      </Routes>
    </Router>
  );
}

export default App;
