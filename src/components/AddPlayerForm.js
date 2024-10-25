import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddPlayerForm = ({ addPlayer }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer({ name, lastName });
    setName('');
    setLastName('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex', // Para alinear los elementos
        flexDirection: 'column',
        gap: 2, // Espaciado entre los campos y el botón
        mb: 3, // Margen inferior
        p: 2, // Padding interno
        backgroundColor: '#f9f9f9', // Fondo claro
        borderRadius: 2, // Bordes redondeados
        boxShadow: 1, // Sombra para efecto de profundidad
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Agregar Jugador al Ranking
      </Typography>
      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Apellido"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          alignSelf: 'center', // Centrar el botón
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark', // Cambiar color al hacer hover
          },
        }}
      >
        Agregar Jugador
      </Button>
    </Box>
  );
};

export default AddPlayerForm;
