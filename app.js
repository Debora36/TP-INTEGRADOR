const express = require('express');
const pug = require('pug');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2');
const sequelize = require('./db');
const { verificarSesion, verificarRol } = require('./middleware/auth');

app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware de debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  next();
});


// Importar rutas
const registroPacienteRoutes = require('./routes/nuevopaciente');
const registroAdmisionRoutes = require('./routes/admision');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const rutasAPI = require('./routes/api');
const pacienteRoutes = require('./routes/paciente');
const habitacionesRoutes = require('./routes/habitaciones');

// Usar rutas
app.use('/modelo/paciente', pacienteRoutes);//lo uso para buscar paciente por dni
app.use('/paciente', pacienteRoutes);//lo uso para editar eliminar y asociar paciente
app.use('/registro', registroPacienteRoutes);
app.use('/admision', registroAdmisionRoutes);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/habitaciones', habitacionesRoutes);
app.use('/api', rutasAPI);//para cargar los planes de obra social
app.use('/Modificar', require('./routes/modificar'));//para buscar/editar/eliminar internaciones
app.use('/turnos', require('./routes/turnos'));
app.use('/medicos', require('./routes/medicos'));
app.get('/enfermeria', verificarSesion, (req, res) => {
  res.redirect('/enfermeria/buscar');
});
app.use('/enfermeria', require('./routes/enfermeria'));

// Vistas protegidas: solo para usuarios autenticados
const Medico = require('./modelo/medico');
app.get('/recepcionista', verificarSesion, verificarRol('Recepcionista'), async (req, res) => {
   try {
    const medicos = await Medico.findAll({ order: [['nombre', 'ASC']] });
    res.render('recepcion', { usuario: req.session.usuario, medicos });
  } catch (error) {
    console.error('Error al cargar médicos:', error);
    res.status(500).send('Error al cargar la vista de recepción');
  }
});
app.get('/modificar', verificarSesion, verificarRol('Recepcionista'), (req, res) => {
  res.render('modificar', { usuario: req.session.usuario });
});


// Página principal: inicio de sesión
app.get('/', (req, res) => {
  res.render('index');
});

// Modelos
require('./modelo');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos conectada y tablas sincronizadas.');
    
    // Cuando las tablas están listas, enciende el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });