import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
    const players = [
        { name: 'first player', symbol: 'X' },
        { name: 'second player', symbol: 'Y' },
    ];
    const [moves, setMoves] = useState([]);
    const [player, setPlayer] = useState(players[0]);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (moves.length < 1) return;

        const currentPlayer = moves[moves.length - 1].player;

        const playerMoves = moves.filter((move) => {
            return move.player.name === currentPlayer.name;
        });

        if (playerWon(playerMoves)) {
            setWinner(currentPlayer);
        }
    }, [moves]);

    function Tile({ coord }) {
        const matchingCoord = moves.find((move) => {
            return move.coord.join() === coord.join();
        });
        const text = matchingCoord ? matchingCoord.player.symbol : '';
        return (
            <div className='tile' onClick={() => addMove(coord)}>
                {text}
            </div>
        );
    }

    function addMove(coord) {
        const newMoves = [...moves];
        newMoves.push({ player, coord });
        setMoves(newMoves);
        const nextPlayer =
            player.name === players[0].name ? players[1] : players[0];
        setPlayer(nextPlayer);
    }

    function playerWon(playerMoves) {
        const xValues = {};
        const yValues = {};

        let diagonal = 0;
        let diagonalReverse = 0;

        playerMoves.forEach((move) => {
            xValues[move.coord[0]] = xValues[move.coord[0]]
                ? xValues[move.coord[0]] + 1
                : 1;
            yValues[move.coord[1]] = yValues[move.coord[1]]
                ? yValues[move.coord[1]] + 1
                : 1;

            if (move.coord.join() === [1, 1].join()) {
                diagonal++;
            }
            if (move.coord.join() === [3, 3].join()) {
                diagonal++;
            }
            if (move.coord.join() === [2, 2].join()) {
                diagonal++;
                diagonalReverse++;
            }
            if (move.coord.join() === [1, 3].join()) {
                diagonalReverse++;
            }
            if (move.coord.join() === [3, 1].join()) {
                diagonalReverse++;
            }
        });

        if (Object.values(xValues).find((val) => val === 3)) return true;
        if (Object.values(yValues).find((val) => val === 3)) return true;
        if (diagonal === 3 || diagonalReverse === 3) return true;
    }

    if (winner) {
        return <h1 className='App'>WINNER: {winner.name}</h1>;
    }

    return (
        <div className='App'>
            <div className='tileRow'>
                {[
                    [1, 1],
                    [2, 1],
                    [3, 1],
                ].map((coord) => {
                    return <Tile coord={coord} />;
                })}
            </div>
            <div className='tileRow'>
                {[
                    [1, 2],
                    [2, 2],
                    [3, 2],
                ].map((coord) => {
                    return <Tile coord={coord} />;
                })}
            </div>
            <div className='tileRow'>
                {[
                    [1, 3],
                    [2, 3],
                    [3, 3],
                ].map((coord) => {
                    return <Tile coord={coord} />;
                })}
            </div>
            <h2>Current Player</h2>
            <div>{player.name}</div>
        </div>
    );
}

export default App;
