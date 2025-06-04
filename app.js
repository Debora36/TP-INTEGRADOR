const express = require('express');
const pug = require('pug');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const sequelize = require('./db');

const session = require('express-session');

// IMPORTA TODOS LOS MODELOS
require('./modelo/paciente');
require('./modelo/obra_social');
require('./modelo/nacionalidad');
require('./modelo/plan_obra_social');
require('./modelo/ala_hospital');
require('./modelo/usuario');

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch(err => console.error('Error de conexión:', err));

// Conexión con la base de datos y sincronización
sequelize.sync({ alter: true }) // alter actualiza las tablas sin borrar datos
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

app.use(session({
  secret: 'mi_clave_secreta', // poner algo más seguro despues
  resave: false,
  saveUninitialized: true,
}));
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  next();
});
// Importar las rutas
const registroPacienteRoutes = require('./routes/nuevopaciente');
const registroAdmisionRoutes = require('./routes/admision');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const rutasAPI = require('./routes/api');
app.use(rutasAPI);

// Configuración de la conexión a la base de datos
app.use(express.urlencoded({extended: true}));// Para poder leer datos de formularios
app.use(express.json()); // muy importante para leer JSON del body

app.use('/', registroPacienteRoutes);
// Indicar que vamos a usar Pug como motor de vistas
app.set('view engine', 'pug');

// Indicar dónde están las vistas
app.set('views', path.join(__dirname, 'vistas'));

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('../public/img'));
// Ruta principal que renderiza la vista Pug

function verificarSesion(req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect('/');
  }
}
app.use(express.json());
app.use('/registro', registroPacienteRoutes);
app.use('/admision', registroAdmisionRoutes);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.get('/', (req, res) => {
  res.render('index'); // busca vistas/index.pug
});

app.post('/registro', (req, res)=>{
    const {user, password, typeofuser}=req.body;//req.body es un objeto que contiene los datos del formulario
    console.log(user, password, typeofuser);
});


app.get('/recepcionista', verificarSesion, (req, res) => {
  res.render('recepcion', { usuario: req.session.usuario });
});


app.get('/modificar', verificarSesion, (req, res) => {
  res.render('modificar', { usuario: req.session.usuario });
});


