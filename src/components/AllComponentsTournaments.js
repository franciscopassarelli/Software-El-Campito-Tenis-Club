import React, { useState, useEffect } from 'react';
import { Container, Typography, CssBaseline, Paper, Grid } from '@mui/material';
import TournamentBracket from './TournamentBracket';
import RankingTable from './RankingTable';
import AddPlayerForm from './AddPlayerForm';

const AllComponentsTournaments = () => {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('players');
    try {
      const parsedPlayers = savedPlayers ? JSON.parse(savedPlayers) : [];
      // Asegúrate de que parsedPlayers sea un array
      return Array.isArray(parsedPlayers) ? parsedPlayers : [];
    } catch (error) {
      console.error('Error parsing players from localStorage:', error);
      return []; // En caso de error, inicializar como array vacío
    }
  });

  const [bracket, setBracket] = useState(Array(32).fill(null));

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const addPlayer = (player) => {
    setPlayers((prevPlayers) => [
      ...prevPlayers,
      { ...player, points: 0, inTournament: false, addedAt: Date.now() },
    ]);
  };

  const updatePlayerPoints = (index, points) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].points = points;
    setPlayers(updatedPlayers);
  };

  const updateBracket = (index, player) => {
    const updatedBracket = [...bracket];
    updatedBracket[index] = player;
    setBracket(updatedBracket);
  };

  const addToTournament = (player) => {
    const updatedPlayers = players.map((p) =>
      p.name === player.name && p.lastName === player.lastName
        ? { ...p, inTournament: true }
        : p
    );
    setPlayers(updatedPlayers);
  };

  // Solo asegurarte de que players sea un array
  const sortedPlayers = Array.isArray(players)
    ? players.slice().sort((a, b) => {
        if (b.points === a.points) {
          return a.addedAt - b.addedAt;
        }
        return b.points - a.points;
      })
    : [];

  return (
    <div style={{ display: 'flex', padding: '20px', backgroundColor: '#2f2f2f', paddingTop: '80px' }}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {/* Encabezado del Torneo */}
        <Typography
          variant="h3"
          gutterBottom
          style={{
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #ff8a00, #e52e71)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)', // Sombra manchada en negro
          }}
        >
          ¡Tu Torneo!
        </Typography>

        {/* Estructura de la página */}
        <Grid container spacing={2}>
          {/* Columna izquierda: Formulario para agregar jugadores */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <AddPlayerForm addPlayer={addPlayer} />
            </Paper>
          </Grid>

          {/* Columna derecha: Tabla de Ranking */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <RankingTable
                players={sortedPlayers}
                updatePlayerPoints={updatePlayerPoints}
                addToTournament={addToTournament}
              />
            </Paper>
          </Grid>

          {/* Fila inferior: Bracket del Torneo */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <TournamentBracket
                bracket={bracket}
                updateBracket={updateBracket}
                players={sortedPlayers.filter((p) => p.inTournament)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AllComponentsTournaments;
