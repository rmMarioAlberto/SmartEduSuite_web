//react imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//material ui imports
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthContext';

//public imports
import LoginScreen from './pages/login/LoginScreen';
import ChangePassword from './pages/login/changePassword';

//admin imports
import AdminDashboard from './pages/admin/indexAdmin';
import CrudAlumnos from './pages/admin/crudAlumnos';
import CrudMaterias from './pages/admin/crudMateria';
import CrudCarreras from './pages/admin/crudCarrera';
import CrudGrupos from './pages/admin/crudGrupo';
import CrudSalones from './pages/admin/crudSalon';
import CrearSalon from './pages/admin/crearSalon';
import CrearAlumno from './pages/admin/crearAlumno';
import CrearGrupo from './pages/admin/crearGrupo';
import Grafica from './pages/admin/grafica';
import CrudMaestros from './pages/admin/crudMaestro';
import ConsultaCarreras from './pages/admin/ConsultaCarrera';
import MaestroConsulta from './pages/admin/MaestroConsulta';
import MaestroForm from './pages/admin/MaestroForm';
import CrearClase from './pages/admin/CrearClase';
import Clase from './pages/admin/Clase';

//maestro imports
import MaestroDashboard from './pages/teachers/indexMaestro';
import Horario from './pages/teachers/horario';
import HorarioMaestro from './pages/teachers/horarioMaestro';
import ListasMaestro from './pages/teachers/listasMaestro';
import horario from './pages/teachers/horario';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/cambio-contrasena" element={<PublicRoute><ChangePassword /></PublicRoute>} />
          <Route path="/teachers/horarioMaestro" element={<PrivateRoute allowedRoles={[2]}><HorarioMaestro /></PrivateRoute>} />
          <Route path="/teachers/listasMaestro" element={<PrivateRoute allowedRoles={[2]}><ListasMaestro /></PrivateRoute>} />
          <Route path="/teachers/horario" element={<PrivateRoute allowedRoles={[2]}><horario /></PrivateRoute>} />
          <Route path="/grafica" element={<PrivateRoute allowedRoles={[3]}><Grafica /></PrivateRoute>} />
          <Route path="/admin/indexMateria" element={<PrivateRoute allowedRoles={[3]}><indexMateria /></PrivateRoute>} />
          <Route path="/admin/indexCarrera" element={<PrivateRoute allowedRoles={[3]}><indexCarrera /></PrivateRoute>} />
          <Route path="/admin/ConsultaCarrera" element={<PrivateRoute allowedRoles={[3]}><ConsultaCarreras /></PrivateRoute>} />
          <Route path="/admin/ConsultaMaestros" element={<PrivateRoute allowedRoles={[3]}><MaestroConsulta /></PrivateRoute>} />
          <Route path="/admin/MaestroForm" element={<PrivateRoute allowedRoles={[3]}><MaestroForm /></PrivateRoute>} />
          <Route path="/admin/CrearClase" element={<PrivateRoute allowedRoles={[3]}><CrearClase /></PrivateRoute>} />
          <Route path="Clase" element={<PrivateRoute allowedRoles={[3]}><Clase /></PrivateRoute>} />
          <Route path='/admin/Horario' element={<PrivateRoute allowedRoles={[3]}><Horario /></PrivateRoute>} />
          {/* Rutas de maestros */}
          <Route path="/maestro/dashboard" element={<PrivateRoute allowedRoles={[2]}><MaestroDashboard /></PrivateRoute>} />
          <Route path="/maestro/horario" element={<PrivateRoute allowedRoles={[2]}><Horario /></PrivateRoute>} />
          <Route path="/maestro/horario-maestro" element={<PrivateRoute allowedRoles={[2]}><HorarioMaestro /></PrivateRoute>} />
          <Route path="/maestro/listas" element={<PrivateRoute allowedRoles={[2]}><ListasMaestro /></PrivateRoute>} />

          {/* Rutas de admin */}
          <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={[3]}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/crud-maestros" element={<PrivateRoute allowedRoles={[3]}><CrudMaestros /></PrivateRoute>} />
          <Route path="/admin/crud-grupos" element={<PrivateRoute allowedRoles={[3]}><CrudGrupos /></PrivateRoute>} />
          <Route path="/admin/crud-materias" element={<PrivateRoute allowedRoles={[3]}><CrudMaterias /></PrivateRoute>} />
          <Route path="/admin/crud-carreras" element={<PrivateRoute allowedRoles={[3]}><CrudCarreras /></PrivateRoute>} />
          <Route path="/admin/crud-alumnos" element={<PrivateRoute allowedRoles={[3]}><CrudAlumnos /></PrivateRoute>} />
          <Route path="/admin/grafica" element={<PrivateRoute allowedRoles={[3]}><Grafica /></PrivateRoute>} />
          <Route path="/admin/crud-salones" element={<PrivateRoute allowedRoles={[3]}><CrudSalones /></PrivateRoute>} />
          <Route path="/admin/crear-salon" element={<PrivateRoute allowedRoles={[3]}><CrearSalon /></PrivateRoute>} />
          <Route path="/admin/crear-grupo" element={<PrivateRoute allowedRoles={[3]}><CrearGrupo /></PrivateRoute>} />
          <Route path="/admin/crear-alumno" element={<PrivateRoute allowedRoles={[3]}><CrearAlumno /></PrivateRoute>} />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;