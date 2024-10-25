import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom'; // Importamos Link desde react-router-dom

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [navBackground, setNavBackground] = useState('rgba(0, 0, 0, 0.7)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Función para cambiar el fondo de la barra de navegación al hacer scroll
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      setNavBackground('rgba(0, 0, 0, 0.3)'); // Más transparente al hacer scroll
    } else {
      setNavBackground('rgba(0, 0, 0, 0.7)'); // Color original
    }
  };

  // Agregamos un efecto para que la barra cambie al hacer scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup del evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: navBackground, transition: 'background-color 0.3s' }}>
      <Toolbar>
      <Box
  component={Link}
  to="/"
  sx={{
    flexGrow: 1,
    textDecoration: 'none', // Elimina el subrayado
  }}
>
  <Typography
    variant="h4"
    sx={{
      color: 'white',             // Color del texto en blanco
      fontWeight: 'bold',         // Negrita para darle más peso
      fontSize: '18px',           // Tamaño más pequeño
      fontFamily: 'Georgia, serif', // Familia serif similar
      letterSpacing: '0.05em',    // Ligero espaciado entre letras
    }}
  >
    El Campito Tenis Club
  </Typography>
</Box>





        {/* Botones en vista de escritorio */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/scheduletable">Horarios/Canchas</Button>
          <Button color="inherit" component={Link} to="/torneos">Torneos</Button>
        </Box>

        {/* Menú en vista móvil */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Menú desplegable */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">Inicio</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/scheduletable">Horarios/Canchas</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/torneos">Torneos</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
