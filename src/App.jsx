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
import Salon from './pages/admin/salon';
import Grafica from './pages/admin/grafica';
import Alumno from './pages/admin/alumno';
import IndexMateria from './pages/admin/indexMateria';
import IndexCarrera from './pages/admin/indexCarrera';
import CrearSalon from './pages/admin/crearSalon';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/cambio-contrasena" element={<PublicRoute><ChangePassword /></PublicRoute>} />
          <Route path="/vista-maestro" element={<PrivateRoute allowedRoles={[2]}><IndexMaestro /></PrivateRoute>} />
          <Route path="/vista-admin" element={<PrivateRoute allowedRoles={[3]}><IndexAdmin /></PrivateRoute>} />
          <Route path="/teachers/horarioMaestro" element={<PrivateRoute allowedRoles={[2]}><HorarioMaestro /></PrivateRoute>} />
          <Route path="/teachers/listasMaestro" element={<PrivateRoute allowedRoles={[2]}><ListasMaestro /></PrivateRoute>} />
          <Route path="/teachers/horario" element={<PrivateRoute allowedRoles={[2]}><horario /></PrivateRoute>} />
          <Route path="/maestros" element={<PrivateRoute allowedRoles={[3]}><Maestros /></PrivateRoute>} />
          <Route path="/grupo" element={<PrivateRoute allowedRoles={[3]}><Grupo /></PrivateRoute>} />
          <Route path="/IndexMateria" element={<PrivateRoute allowedRoles={[3]}><IndexMateria /></PrivateRoute>} />
          <Route path='/IndexCarrera' element={<PrivateRoute allowedRoles={[3]}><IndexCarrera /></PrivateRoute>} />
          <Route path="/alumnos" element={<PrivateRoute allowedRoles={[3]}><IndexAdmin /></PrivateRoute>} />
          <Route path="/grafica" element={<PrivateRoute allowedRoles={[3]}><Grafica /></PrivateRoute>} />
          <Route path="/admin/indexMateria" element={<PrivateRoute allowedRoles={[3]}><indexMateria /></PrivateRoute>} />
          <Route path="/admin/indexCarrera" element={<PrivateRoute allowedRoles={[3]}><indexCarrera /></PrivateRoute>} />
          <Route path="/alumno" element={<PrivateRoute allowedRoles={[3]}><Alumno /></PrivateRoute>} />
          <Route path="/salon" element={<PrivateRoute allowedRoles={[3]}><Salon /></PrivateRoute>} />
          <Route path="/crearSalon" element={<PrivateRoute allowedRoles={[3]}><CrearSalon /></PrivateRoute>} />
        
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;