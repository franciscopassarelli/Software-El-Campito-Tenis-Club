import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importamos react-router-dom
import AllComponentsTournaments from './components/AllComponentsTournaments';
import Navbar from './components/Navbar';  // Importamos el componente Navbar
import Inicio from './components/Inicio';  // Importamos el componente Inicio
import ScheduleTable from './components/ScheduleTable';     // Importamos el componente Menu


const App = () => {
  return (
    <Router>
      <Navbar /> {/* Incluimos el componente Navbar */}
      <Routes>
        <Route path="/" element={<Inicio />} /> {/* Página de inicio */}
        <Route path="/scheduletable" element={<ScheduleTable />} /> {/* Página de menú */}
        <Route path="/torneos" element={<AllComponentsTournaments />} /> {/* Página de categorías */}
      </Routes>
    </Router>
  );
};

export default App;
