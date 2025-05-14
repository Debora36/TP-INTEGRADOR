const express = require('express');
const pug = require('pug');
const path = require('path');
const app = express();
const port = 3000;

// Indicar que vamos a usar Pug como motor de vistas
app.set('view engine', 'pug');

// Indicar dónde están las vistas
app.set('views', path.join(__dirname, 'vistas'));

// Archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.static('../public/img'));
// Ruta principal que renderiza la vista Pug
app.get('/', (req, res) => {
  res.render('index'); // busca vistas/index.pug
});

app.post('/registro', (req, res)=>{
    const {user, password, typeofuser}=req.body;//req.body es un objeto que contiene los datos del formulario
    console.log(user, password, typeofuser);
});

app.get('/recepcionista', (req, res)=>{
  res.render('recepcion'); // busca vistas/recepcion.pug
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
