const bcrypt = require('bcrypt');
const Usuario = require('../modelo/usuario');
const {Enfermero, Medico } = require('../modelo');
exports.login = async (req, res) => {
  const { nombre_usuario, contrasena, rol } = req.body;

  try {
    const user = await Usuario.findOne({
      where: { nombre_usuario } 
    });

    if (!user){
        return res.render('index', { error: 'El usuario no existe.' });
    }

    if (user.rol !== rol) {
        return res.render('index', { error: 'El usuario no tiene permisos para este rol.' });
    }
    
    const passwordCorrecta = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordCorrecta) {
      return res.render('index', { error: 'La contraseña ingresada es incorrecta.' });
    }

    let datosSesion = {
      id_usuario: user.ID, 
      nombre_usuario: user.nombre_usuario,
      rol: user.rol,
      id_perfil: null 
    };
    console.log("Usuario autenticado:", datosSesion);

    if (user.rol === 'Enfermero') {
        // Buscamos en la tabla enfermero usando el ID del usuario
        const perfilEnfermero = await Enfermero.findOne({ 
            where: { ID_Usuario: user.ID }
        });

        if (perfilEnfermero) {
            datosSesion.id_perfil = perfilEnfermero.id;

        } else {
            console.warn("Usuario es enfermero pero no tiene perfil en tabla 'enfermero'");
        }
    } 
    else if (user.rol === 'Médico' || user.rol === 'Medico') {
        const perfilMedico = await Medico.findOne({ 
            where: { ID_Usuario: user.ID } 
        });

        if (perfilMedico) {
            datosSesion.id_perfil = perfilMedico.id;
        }
    }

    // guardo el objeto completo en la sesión
    req.session.usuario = datosSesion;

    switch (user.rol) {
      case 'Recepcionista':
        return res.redirect('/recepcionista');
      case 'Médico':
        return res.redirect('/medicos');
      case 'Enfermero':
        return res.redirect('/enfermeria');
      default:
        return res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};