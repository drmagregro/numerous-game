import React, { useState, useEffect } from 'react';
import socket from './socket';

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

    useEffect(() => {
      socket.on('game-created', (data) => {
          setGameId(data.gameId);
          const gameUrl = `${window.location.origin}/?gameId=${data.gameId}`;
          alert(`Game created! Share this link: ${gameUrl}`);
      });
  }, []);

    const joinGame = () => {
        socket.emit('join-game', inputGameId);
    };

    return (
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
                        <button onClick={joinGame}>Join Game</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
