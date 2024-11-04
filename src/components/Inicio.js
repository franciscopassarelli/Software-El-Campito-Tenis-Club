import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

const Inicio = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    { message: '¡Gestiona tus alquileres de cancha!', color: 'linear-gradient(90deg, #058a00, #e52e71)' },
    { message: '¡Organiza un torneo desde cero con nuestro sistema!', color: 'linear-gradient(90deg, #00bcd4, #3f51b5)' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % texts.length);
    }, 3500); // Cambia de texto cada 3.5 segundos

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        paddingTop: { xs: '50px', md: '90px' },
        paddingBottom: 10,
        textAlign: 'center',
      }}
    >
         <Box 
  sx={{ 
    textAlign: 'center', 
    marginBottom: '20px',
    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))', // Degradado invertido
    padding: '10px', // Espaciado alrededor del logo
    borderRadius: '50%', // Hace que el fondo sea redondo
    width: '320px', // Ancho del fondo (puedes ajustar según sea necesario)
    height: '320px', // Alto del fondo (puedes ajustar según sea necesario)
    display: 'flex', // Para centrar la imagen
    justifyContent: 'center', // Centrar horizontalmente
    alignItems: 'center' // Centrar verticalmente
  }}
>
  <img 
    src="/images/elcampito1.png" 
    alt="Logo" 
    style={{ 
      width: '400px', // Ancho fijo
      height: '400px', // Alto fijo para mantener la proporción
      borderRadius: '50%', // Esto hará la imagen redonda
      objectFit: 'contain' // Esto asegurará que toda la imagen se muestre sin recortes
    }} 
  />
</Box>

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          color: 'transparent',
          backgroundImage: 'linear-gradient(90deg, #ff8a00, #e52e71)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
          mb: 4,
        }}
      >
        ¡El Campito Tenis Club te da la Bienvenida!
      </Typography>
      
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          color: 'transparent',
          backgroundImage: texts[currentTextIndex].color,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
          mb: 4,
          transition: 'opacity 0.5s',
          opacity: 1,
          padding: '0 20px',
        }}
      >
        {texts[currentTextIndex].message}
      </Typography>
    </Box>
  );
};

export default Inicio;
