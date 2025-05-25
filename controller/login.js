const Usuario = require('../modelo/usuario');

exports.login = async (req, res) => {
  const { nombre_usuario, contrasena, rol } = req.body;
    console.log('Datos recibidos:', nombre_usuario, contrasena, rol);
  try {
    const user = await Usuario.findOne({
      where: { nombre_usuario, rol }
    });

    if (!user) {
        return res.status(401).send('Usuario o rol incorrecto');
    }
    if (user.contrasena !== contrasena) {
      return res.status(401).send('Contraseña incorrecta');
    }

    req.session.usuario = user;

    switch (user.rol) {
      case 'Recepcionista':
        return res.redirect('/recepcionista');
      case 'Médico':
        return res.redirect('/medico');
      case 'enfermero':
        return res.redirect('/enfermeria');
      default:
        return res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};