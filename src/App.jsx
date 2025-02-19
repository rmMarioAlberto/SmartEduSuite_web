import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/login/LoginScreen';
import ChangePassword from './pages/login/changePassword';
import IndexAdmin from './pages/admin/indexAdmin';
import IndexMaestro from './pages/teachers/indexMaestro';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import HorarioMaestro from './pages/teachers/horarioMaestro';
import ListasMaestro from './pages/teachers/listasMaestro';
import horario from './pages/teachers/horario';
import Maestros from './pages/admin/maestro';
import Grupo from './pages/admin/grupo';
import Grafica from './pages/admin/grafica';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/cambio-contrasena" element={<ChangePassword />} />
          <Route path="/vista-maestro" element={<PrivateRoute allowedRoles={[2]}><IndexMaestro /></PrivateRoute>} />
          <Route path="/vista-admin" element={<PrivateRoute allowedRoles={[3]}><IndexAdmin /></PrivateRoute>} />
          <Route path="/teachers/horarioMaestro" element={<HorarioMaestro />} />
          <Route path="/teachers/listasMaestro" element={<ListasMaestro />} />
          <Route path="/teachers/horario" element={<horario />} />
          <Route path="/maestros" element={<PrivateRoute><Maestros /></PrivateRoute>} />
          <Route path="/grupo" element={<PrivateRoute><Grupo /></PrivateRoute>} />
          <Route path="/grafica" element={<PrivateRoute><Grafica /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
