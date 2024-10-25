import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Box,
} from '@mui/material';

const RankingTable = ({ players, updatePlayerPoints }) => {
  const [playerList, setPlayerList] = useState(() => {
    const storedPlayers = localStorage.getItem('players');
    try {
      const parsedPlayers = storedPlayers ? JSON.parse(storedPlayers) : [];
      return Array.isArray(parsedPlayers) ? parsedPlayers : [];
    } catch (error) {
      console.error('Error parsing players from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    setPlayerList(players);
  }, [players]);

  useEffect(() => {
    if (Array.isArray(playerList)) {
      localStorage.setItem('players', JSON.stringify(playerList));
    }
  }, [playerList]);

  const addPoints = (index) => {
    const updatedPlayers = [...playerList];
    updatedPlayers[index].points += 1;
    setPlayerList(updatedPlayers);
    updatePlayerPoints(index, updatedPlayers[index].points);
  };

  const subtractPoints = (index) => {
    const updatedPlayers = [...playerList];
    updatedPlayers[index].points -= 1;
    setPlayerList(updatedPlayers);
    updatePlayerPoints(index, updatedPlayers[index].points);
  };

  const toggleTournamentStatus = (index) => {
    const updatedPlayers = [...playerList];
    updatedPlayers[index].inTournament = !updatedPlayers[index].inTournament;
    setPlayerList(updatedPlayers);
    updatePlayerPoints(index, updatedPlayers[index].points);
  };

  const removePlayer = (index) => {
    const updatedPlayers = playerList.filter((_, i) => i !== index);
    setPlayerList(updatedPlayers);
  };

  const sortedPlayers = Array.isArray(playerList) ? [...playerList].sort((a, b) => b.points - a.points) : [];

  return (
    <Paper sx={{ mb: 3, p: 2, boxShadow: 3 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Ranking de Jugadores
      </Typography>
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Ranking</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Nombre y Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Puntos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Actualizar Puntos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Torneo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow key={index} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box>
                    <Typography
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {player.name}
                    </Typography>
                    <Typography
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {player.lastName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{player.points}</TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Button
                      variant="outlined"
                      onClick={() => addPoints(index)}
                      sx={{ mr: 1, minWidth: '30px', padding: '5px' }}
                    >
                      +1
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => subtractPoints(index)}
                      sx={{ ml: 1, minWidth: '30px', padding: '5px' }}
                    >
                      -1
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    variant={player.inTournament ? 'contained' : 'outlined'}
                    onClick={() => toggleTournamentStatus(index)}
                    sx={{
                      backgroundColor: player.inTournament ? 'success.main' : 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: player.inTournament ? 'success.dark' : 'primary.dark',
                      },
                      minWidth: '60px',
                      padding: '5px',
                    }}
                  >
                    {player.inTournament ? 'Eliminar' : 'Añadir'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removePlayer(index)}
                    sx={{ minWidth: '60px', padding: '5px' }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RankingTable;
