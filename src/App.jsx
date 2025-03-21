//react imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//material ui imports
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthContext';

//google impost
import { GoogleOAuthProvider } from "@react-oauth/google";

//public imports
import LoginScreen from './pages/login/LoginScreen';
import ChangePassword from './pages/login/changePassword';

//admin imports
import AdminDashboard from './pages/admin/indexAdmin';
import CrudAlumnos from './pages/admin/crudAlumno';
import CrudMaterias from './pages/admin/crudMateria';
import CrudCarreras from './pages/admin/crudCarrera';
import CrudGrupos from './pages/admin/crudGrupo';
import CrudSalon from './pages/admin/crudSalon';
import CrudMaestros from './pages/admin/crudMaestro';
import CrudClases from './pages/admin/crudClase';
import CrudEstadisticas from './pages/admin/crudEstadistica';

import CrearSalon from './pages/admin/crearSalon';
import CrearAlumno from './pages/admin/crearAlumno';
import CrearGrupo from './pages/admin/crearGrupo';
import CrearClase from './pages/admin/CrearClase';
import CrearMaestro from './pages/admin/crearMaestro';
import CrearMateria from './pages/admin/crearMateria';
import CrearCarrera from './pages/admin/crearCarrera';

import Grafica from './pages/admin/grafica';
import Reporte from './pages/admin/reporte';

import ConsultaCarrera from './pages/admin/ConsultaCarrera';
import ConsultaMaestro from './pages/admin/consultaMaestro';
import ConsultaGrupo from './pages/admin/consultaGrupo';
import ConsultaMateria from './pages/admin/consultaMateria';
import ConsultaSalon from './pages/admin/consultaSalon';
import ConsultaAlumno from './pages/admin/consultaAlumno';
import ConsultaClase from './pages/admin/consultaClase';

//maestro imports
import MaestroDashboard from './pages/teachers/indexMaestro';
import HorarioMaestro from './pages/teachers/horarioMaestro';
import ListasMaestro from './pages/teachers/listasMaestro';

const clientId = '1018434450389-cont8867068oegkgggd59e7n4apjrer3.apps.googleusercontent.com'

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Router>
    <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
          <Route path="/cambio-contrasena" element={<PublicRoute><ChangePassword /></PublicRoute>} />

          {/* Rutas de maestros */}
          <Route path="/maestro/dashboard" element={<PrivateRoute allowedRoles={[2]}><MaestroDashboard /></PrivateRoute>} />
          <Route path="/maestro/horario-maestro" element={<PrivateRoute allowedRoles={[2]}><HorarioMaestro /></PrivateRoute>} />
          <Route path="/maestro/listas-maestro" element={<PrivateRoute allowedRoles={[2]}><ListasMaestro /></PrivateRoute>} />

          {/* Rutas de admin */}
          <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={[3]}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/crud-maestros" element={<PrivateRoute allowedRoles={[3]}><CrudMaestros /></PrivateRoute>} />
          <Route path="/admin/crud-grupos" element={<PrivateRoute allowedRoles={[3]}><CrudGrupos /></PrivateRoute>} />
          <Route path="/admin/crud-materias" element={<PrivateRoute allowedRoles={[3]}><CrudMaterias /></PrivateRoute>} />
          <Route path="/admin/crud-carreras" element={<PrivateRoute allowedRoles={[3]}><CrudCarreras /></PrivateRoute>} />
          <Route path="/admin/crud-alumnos" element={<PrivateRoute allowedRoles={[3]}><CrudAlumnos /></PrivateRoute>} />
          <Route path="/admin/crud-salones" element={<PrivateRoute allowedRoles={[3]}><CrudSalon /></PrivateRoute>} />
          <Route path="/admin/crud-clases" element={<PrivateRoute allowedRoles={[3]}><CrudClases /></PrivateRoute>} />
          <Route path="/admin/crud-estadisticas" element={<PrivateRoute allowedRoles={[3]}><CrudEstadisticas /></PrivateRoute>} />

          <Route path="/admin/grafica" element={<PrivateRoute allowedRoles={[3]}><Grafica /></PrivateRoute>} />
          <Route path="/admin/reporte" element={<PrivateRoute allowedRoles={[3]}><Reporte/></PrivateRoute>} />

          <Route path="/admin/crear-salon/:idSalon?" element={<PrivateRoute allowedRoles={[3]}><CrearSalon /></PrivateRoute>} />
          <Route path="/admin/crear-grupo/:idGrupo?" element={<PrivateRoute allowedRoles={[3]}><CrearGrupo /></PrivateRoute>} />
          <Route path="/admin/crear-alumno/:idAlumno?" element={<PrivateRoute allowedRoles={[3]}><CrearAlumno /></PrivateRoute>} />
          <Route path="/admin/crear-maestro/:id?" element={<PrivateRoute allowedRoles={[3]}><CrearMaestro /></PrivateRoute>} />          
          <Route path="/admin/crear-clase/:idclase?" element={<PrivateRoute allowedRoles={[3]}><CrearClase /></PrivateRoute>} />
          <Route path="/admin/crear-materia/:idMateria?" element={<PrivateRoute allowedRoles={[3]}><CrearMateria /></PrivateRoute>} />
          <Route path="/admin/crear-carrera/:idCarrera?" element={<PrivateRoute allowedRoles={[3]}><CrearCarrera /></PrivateRoute>} />

          <Route path="/admin/consulta-carrera" element={<PrivateRoute allowedRoles={[3]}><ConsultaCarrera /></PrivateRoute>} />
          <Route path="/admin/consulta-maestro" element={<PrivateRoute allowedRoles={[3]}><ConsultaMaestro /></PrivateRoute>} />
          <Route path="/admin/consulta-grupo" element={<PrivateRoute allowedRoles={[3]}><ConsultaGrupo /></PrivateRoute>} />
          <Route path="/admin/consulta-materia" element={<PrivateRoute allowedRoles={[3]}><ConsultaMateria /></PrivateRoute>} />
          <Route path="/admin/consulta-carrea" element={<PrivateRoute allowedRoles={[3]}><ConsultaCarrera /></PrivateRoute>} />
          <Route path="/admin/consulta-salon" element={<PrivateRoute allowedRoles={[3]}><ConsultaSalon /></PrivateRoute>} />
          <Route path="/admin/consulta-alumno" element={<PrivateRoute allowedRoles={[3]}><ConsultaAlumno /></PrivateRoute>} />
          <Route path="/admin/consulta-clase" element={<PrivateRoute allowedRoles={[3]}><ConsultaClase /></PrivateRoute>} />

        </Routes>
        </AuthProvider>
      </Router>
      </GoogleOAuthProvider>
  );
}

export default App;