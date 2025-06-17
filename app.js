const express = require('express');
const pug = require('pug');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const sequelize = require('./db');

// ... tus require y configuración inicial

app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware de debug (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const session = require('express-session');
app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  next();
});

// Función de sesión
function verificarSesion(req, res, next) {
  if (req.session.usuario) next();
  else res.redirect('/');
}

// Importar rutas
const registroPacienteRoutes = require('./routes/nuevopaciente');
const registroAdmisionRoutes = require('./routes/admision');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const rutasAPI = require('./routes/api');
const pacienteRoutes = require('./routes/paciente');
const habitacionesRoutes = require('./routes/habitaciones');

// Usar rutas
app.use('/modelo/paciente', pacienteRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/registro', registroPacienteRoutes);
app.use('/admision', registroAdmisionRoutes);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/habitaciones', habitacionesRoutes);
app.use(rutasAPI);
app.use('/Modificar', require('./routes/modificar'));
app.use('/turnos', require('./routes/turnos'));
// Vistas protegidas
const Medico = require('./modelo/medico');
app.get('/recepcionista', verificarSesion, async (req, res) => {
   try {
    const medicos = await Medico.findAll({ order: [['nombre', 'ASC']] });
    res.render('recepcion', { usuario: req.session.usuario, medicos });
  } catch (error) {
    console.error('Error al cargar médicos:', error);
    res.status(500).send('Error al cargar la vista de recepción');
  }
});
app.get('/modificar', verificarSesion, (req, res) => {
  res.render('modificar', { usuario: req.session.usuario });
});

// Página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Solo si necesitás recibir post de registro por otra razón:
app.post('/registro', (req, res) => {
  const { user, password, typeofuser } = req.body;
  console.log(user, password, typeofuser);
});

// Modelos
require('./modelo/paciente');
require('./modelo/obra_social');
require('./modelo/nacionalidad');
require('./modelo/plan_obra_social');
require('./modelo/ala_hospital');
require('./modelo/usuario');

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch(err => console.error('Error de conexión:', err));

// Escuchar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});