import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Popover,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { EventAvailable, EventBusy, Delete } from '@mui/icons-material';

const ScheduleTable = () => {
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);
  const [reservations, setReservations] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [userName, setUserName] = useState('');

  const times = Array.from({ length: 33 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  });

  useEffect(() => {
    const savedReservations = localStorage.getItem('reservations');
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    }
  }, []);

  const saveReservations = (newReservations) => {
    localStorage.setItem('reservations', JSON.stringify(newReservations));
  };

  const handleDateChange = (date) => {
    setCurrentDay(date);
  };

  const handleOpenPopover = (event, time, court) => {
    setAnchorEl(event.currentTarget);
    setSelectedTime(time);
    setSelectedCourt(court);
    setUserName('');
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleReservation = (type) => {
    const key = `${format(currentDay, 'dd-MM-yyyy')}_${selectedTime}_${selectedCourt}`;
    const updatedReservations = { ...reservations };

    if (type === 'disponible') {
      delete updatedReservations[key];
    } else {
      updatedReservations[key] = {
        type: type,
        name: userName || 'Anónimo',
      };
    }

    setReservations(updatedReservations);
    saveReservations(updatedReservations);
    handleClosePopover();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: '20px', backgroundColor: '#2f2f2f', paddingTop: '80px' }}>
      {/* Sección del logo y calendario */}
      <Box sx={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: { xs: '20px', md: '0' } }}>
      <Box 
  sx={{ 
    textAlign: 'center', 
    marginBottom: '20px',
    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))', // Degradado invertido
    padding: '10px', // Espaciado alrededor del logo
    borderRadius: '50%', // Hace que el fondo sea redondo
    width: '220px', // Ancho del fondo (puedes ajustar según sea necesario)
    height: '220px', // Alto del fondo (puedes ajustar según sea necesario)
    display: 'flex', // Para centrar la imagen
    justifyContent: 'center', // Centrar horizontalmente
    alignItems: 'center' // Centrar verticalmente
  }}
>
  <img 
    src="/images/elcampito1.png" 
    alt="Logo" 
    style={{ 
      width: '200px', // Ancho fijo
      height: '200px', // Alto fijo para mantener la proporción
      borderRadius: '50%', // Esto hará la imagen redonda
      objectFit: 'contain' // Esto asegurará que toda la imagen se muestre sin recortes
    }} 
  />
</Box>




        <Box>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: '#fff' }}>
            Selecciona un día
          </Typography>
          <DatePicker
            selected={currentDay}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            inline
            todayButton="Hoy"
            locale={es}
          />
        </Box>
      </Box>

      {/* Sección de la tabla */}
      <Box sx={{ flex: '3' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <Box sx={{ textAlign: 'center', color: '#fff' }}>
            <IconButton sx={{ color: '#ffc107' }}><EventAvailable /></IconButton>
            <Typography variant="body2">Alquilar Eventual</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', color: '#fff' }}>
            <IconButton sx={{ color: '#155724' }}><EventBusy /></IconButton>
            <Typography variant="body2">Alquilar Fijo</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', color: '#fff' }}>
            <IconButton sx={{ color: '#dc3545' }}><Delete /></IconButton>
            <Typography variant="body2">Eliminar Reserva</Typography>
          </Box>
        </Box>

        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: '#fff',
            margin: '0 20px',
          }}
        >
          Horarios de Canchas - {format(currentDay, 'EEEE dd/MM/yyyy', { locale: es })}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: { xs: '100%', md: '700px' },
            margin: '0 auto',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <Table size="small" sx={{ borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center', padding: '2px', border: '1px solid black' }}>
                  Horario
                </TableCell>
                <TableCell sx={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center', padding: '2px', border: '1px solid black' }}>
                  Cancha 1
                </TableCell>
                <TableCell sx={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center', padding: '2px', border: '1px solid black' }}>
                  Cancha 2
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {times.map((time) => (
                <TableRow key={time}>
                  <TableCell sx={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center', padding: '2px', border: '1px solid black' }}>
                    {time}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_1`] 
                        ? (reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_1`].type === 'reservada_eventual' ? '#ffc107' : '#155724') 
                        : '#28a745',
                      color: '#000',
                      textAlign: 'center',
                      padding: '2px',
                      border: '1px solid black',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#005f00', // Color verde oscuro 
                        }
                    }}
                    onClick={(e) => handleOpenPopover(e, time, '1')}
                  >
                    {reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_1`]
                      ? `${reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_1`].name} (${reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_1`].type === 'reservada_eventual' ? 'Eventual' : 'Fijo'})`
                      : 'Disponible'}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_2`] 
                        ? (reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_2`].type === 'reservada_eventual' ? '#ffc107' : '#155724') 
                        : '#28a745',
                      color: '#000',
                      textAlign: 'center',
                      padding: '2px',
                      border: '1px solid black',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#005f00', // Color verde oscuro 
                        }
                    }}
                    onClick={(e) => handleOpenPopover(e, time, '2')}
                  >
                    {reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_2`]
                      ? `${reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_2`].name} (${reservations[`${format(currentDay, 'dd-MM-yyyy')}_${time}_2`].type === 'reservada_eventual' ? 'Eventual' : 'Fijo'})`
                      : 'Disponible'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ padding: '10px' }}>
            <Typography variant="h6" gutterBottom>
              Elige el tipo de reserva:
            </Typography>
            <input
              type="text"
              placeholder="Nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
            />
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleReservation('reservada_eventual')}
              sx={{ margin: '5px' }}
            >
              Reservada (Eventual)
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleReservation('reservada_fijo')}
              sx={{ margin: '5px' }}
            >
              Reservada (Fijo)
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleReservation('disponible')}
              sx={{ margin: '5px' }}
            >
              Cancelar Reserva
            </Button>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default ScheduleTable;
