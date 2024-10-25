import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  PLAYER: 'player',
};

// Componente PlayerSlot (sin cambios)
const PlayerSlot = ({
  player, index, onDropPlayer, isWinner, isLoser, onMarkWinner, result, onResultChange,
}) => {
  const [, ref] = useDrop({
    accept: ItemTypes.PLAYER,
    drop: (droppedPlayer) => onDropPlayer(index, droppedPlayer),
    canDrop: () => !player, // Evitar colocar jugador si ya hay uno
  });

  return (
    <Box
      ref={ref}
      sx={{
        m: 1,
        minWidth: '120px',
        minHeight: '40px',
        border: '1px solid gray',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: player
          ? (isWinner ? 'lightgoldenrodyellow' : isLoser ? 'lightcoral' : 'lightgreen')
          : 'white',
        cursor: player ? 'pointer' : 'default',
      }}
      onClick={() => player && !isLoser && onMarkWinner(index)} // Evitar marcar como ganador si ya ha perdido
    >
      {player ? `${player}${isWinner ? ' (G)' : isLoser ? ' (P)' : ''}` : 'Vacío'}
      {isWinner && (
        <input
          type="text"
          placeholder="Resultado"
          value={result || ''}
          onChange={(e) => onResultChange(e.target.value)}
          style={{ marginLeft: '10px', width: '60px' }}
        />
      )}
    </Box>
  );
};

// Componente DraggablePlayer (sin cambios)
const DraggablePlayer = ({ player, index, isDropped }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemTypes.PLAYER,
    item: { player, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => !isDropped, // No permitir arrastrar si el jugador ya fue colocado
  });

  return (
    <Box
      ref={ref}
      sx={{
        p: 1,
        m: 1,
        minWidth: '120px',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDropped ? 'lightgray' : 'lightblue', // Cambia el color si ya fue colocado
        cursor: isDropped ? 'not-allowed' : 'pointer',
      }}
    >
      {player}
    </Box>
  );
};

const TournamentBracket = ({ players }) => {
  const [bracket, setBracket] = useState(Array(players.length).fill(null));
  const [winners, setWinners] = useState([]);
  const [results, setResults] = useState(Array(players.length).fill(null));
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    const savedBracket = JSON.parse(localStorage.getItem('bracket'));
    const savedWinners = JSON.parse(localStorage.getItem('winners'));
    const savedResults = JSON.parse(localStorage.getItem('results'));
    const savedHistory = JSON.parse(localStorage.getItem('history'));
    const savedChampion = JSON.parse(localStorage.getItem('champion'));

    if (savedBracket) setBracket(savedBracket);
    if (savedWinners) setWinners(savedWinners);
    if (savedResults) setResults(savedResults);
    if (savedHistory) setHistory(savedHistory);
    if (savedChampion) setChampion(savedChampion);
  }, []);

  // Guardar datos en localStorage cuando cambian los estados
  useEffect(() => {
    localStorage.setItem('bracket', JSON.stringify(bracket));
  }, [bracket]);

  useEffect(() => {
    localStorage.setItem('winners', JSON.stringify(winners));
  }, [winners]);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('champion', JSON.stringify(champion));
  }, [champion]);


  const getRoundName = (playerCount) => {
    switch (playerCount) {
      case 32: return 'Ronda de 32';
      case 16: return 'Octavos de Final';
      case 8: return 'Cuartos de Final';
      case 4: return 'Semifinal';
      case 2: return 'Final';
      default: return '';
    }
  };

  // Función para obtener los nombres completos de los jugadores
  const getFullPlayerName = (player) => `${player.name} ${player.lastName}`;

  useEffect(() => {
    const validPlayerCounts = [32, 16, 8, 4, 2];
    if (!validPlayerCounts.includes(players.length)) {
      setError(`El torneo debe tener exactamente 32, 16, 8, 4 o 2 jugadores. Actualmente hay ${players.length} jugadores.`);
    } else {
      setError(null);
    }
  }, [players.length]);

  const isPlayerAdded = (playerName) => bracket.includes(playerName);

  // Función para añadir jugadores aleatoriamente
  const addPlayersRandomly = () => {
    const unassignedPlayers = players
      .filter((player) => !isPlayerAdded(getFullPlayerName(player))) // Jugadores que aún no están asignados
      .map(getFullPlayerName);

    const emptySlots = bracket.map((slot, index) => (slot === null ? index : null)).filter((index) => index !== null); // Encuentra slots vacíos

    if (unassignedPlayers.length > 0 && emptySlots.length > 0) {
      const shuffledPlayers = [...unassignedPlayers].sort(() => Math.random() - 0.5); // Orden aleatorio

      const newBracket = [...bracket];
      for (let i = 0; i < emptySlots.length && i < shuffledPlayers.length; i++) {
        newBracket[emptySlots[i]] = shuffledPlayers[i];
      }
      setBracket(newBracket);
    }
  };


  const onDropPlayer = (index, droppedPlayer) => {
    if (!isPlayerAdded(droppedPlayer.player)) {
      const newBracket = [...bracket];
      newBracket[index] = droppedPlayer.player;
      setBracket(newBracket);
    }
  };

  const onMarkWinner = (index) => {
    const player = bracket[index];
    if (player && !winners.includes(player)) {
      const newWinners = winners.filter((w) => w !== player);
      const loserIndex = index % 2 === 0 ? index + 1 : index - 1;
      const loserPlayer = bracket[loserIndex];
      if (loserPlayer) {
        newWinners.push(player);
        setWinners(newWinners);
        if (newWinners.length === 1 && bracket.length === 2) {
          setChampion(player);
        }
      }
    }
  };

  const addResult = (index, result) => {
    const newResults = [...results];
    newResults[index] = result;
    setResults(newResults);
  };

  const resetBracket = () => {
    setBracket(Array(players.length).fill(null));
    setWinners([]);
    setResults(Array(players.length).fill(null));
    setHistory([]);
    setChampion(null);
  };

  const createBracketStructure = () => {
    const structure = [];
    const matchups = [];

    for (let i = 0; i < bracket.length; i += 2) {
      matchups.push({ player1: bracket[i], player2: bracket[i + 1], index: i });
    }

    structure.push(matchups);
    return structure;
  };

  const advanceToNextRound = () => {
    if (winners.length < 2) {
      alert('Debe haber al menos 2 ganadores para avanzar a la siguiente ronda.');
      return;
    }

    setHistory([...history, { bracket, winners, results }]);

    const newBracket = [...winners];
    setBracket(newBracket);
    setWinners([]);
    setResults(Array(newBracket.length).fill(null));
    setChampion(null);
  };

  const goBackToPreviousRound = () => {
    if (history.length === 0) {
      alert('No hay rondas anteriores a las que volver.');
      return;
    }

    const previousState = history[history.length - 1];
    setBracket(previousState.bracket);
    setWinners(previousState.winners);
    setResults(previousState.results);
    setHistory(history.slice(0, history.length - 1));
    setChampion(null);
  };

  const bracketStructure = createBracketStructure();

  return (
    
    <DndProvider backend={HTML5Backend} >
      <Grid container spacing={2}>
        {/* Columna de selección de jugadores */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid gray', borderRadius: '8px', height: '100%' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Selecciona tus jugadores
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                overflowY: 'auto', // Permitir scroll vertical
                height: '400px', // Ajusta la altura como desees
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {players.filter((player) => player.inTournament).map((player, idx) => {
                const playerName = `${player.name} ${player.lastName}`;
                return (
                  <Box key={idx} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <DraggablePlayer
                      player={playerName}
                      isDropped={isPlayerAdded(playerName)}
                    />
                    {idx % 2 !== 0 && <Box sx={{ width: '20px' }} />} {/* Espacio entre filas */}
                  </Box>
                  
                );
              })}
              
            </Box>
             {/* Botón para añadir jugadores aleatoriamente */}
           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button onClick={addPlayersRandomly} variant="contained" color="primary">
                Añadir Jugadores Aleatoriamente
              </Button>
            </Box>
        
          </Box>
        </Grid>
        

        {/* Columna del torneo */}
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 2, border: '1px solid gray', borderRadius: '8px', height: '100%' }}>
            <Typography variant="h6" align="center">Cuadro del Torneo - {getRoundName(bracket.length)}</Typography>
            
            {error && (
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
            )}

            {!error && (
              <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}> {/* Agregar scroll al cuadro del torneo */}
                {bracketStructure[0].map((matchup, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                    <PlayerSlot
                      player={matchup.player1}
                      index={matchup.index}
                      onDropPlayer={onDropPlayer}
                      isWinner={winners.includes(matchup.player1)}
                      isLoser={winners.includes(matchup.player2)}
                      onMarkWinner={onMarkWinner}
                      result={results[matchup.index]}
                      onResultChange={(value) => addResult(matchup.index, value)}
                    />
                    <Typography variant="h6" sx={{ mx: 2 }}>VS</Typography>
                    <PlayerSlot
                      player={matchup.player2}
                      index={matchup.index + 1}
                      onDropPlayer={onDropPlayer}
                      isWinner={winners.includes(matchup.player2)}
                      isLoser={winners.includes(matchup.player1)}
                      onMarkWinner={onMarkWinner}
                      result={results[matchup.index + 1]}
                      onResultChange={(value) => addResult(matchup.index + 1, value)}
                    />
                  </Box>
                ))}
              </Box>
            )}
               {champion && (
                  <Typography variant="h4" color="success.main" align="center" sx={{ mt: 4 }}>
                    ¡Felicidades al campeón: {champion}!🏆
                  </Typography>
                )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button onClick={resetBracket} variant="contained" color="secondary" sx={{ mx: 1 }}>
                Reiniciar Torneo
              </Button>
              <Button onClick={advanceToNextRound} variant="contained" color="primary" sx={{ mx: 1 }} disabled={error || winners.length === 0}>
                Avanzar Ronda
              </Button>
              <Button onClick={goBackToPreviousRound} variant="contained" color="default" sx={{ mx: 1 }} disabled={history.length === 0}>
                Volver Ronda
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default TournamentBracket;
