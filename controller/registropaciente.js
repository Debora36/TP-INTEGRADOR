const Nacionalidad = require('../modelo/nacionalidad');
const ObraSocial = require('../modelo/obra_social');
const Plan = require('../modelo/plan_obra_social');
const { Op } = require('sequelize');
console.log("Ruta GET /registro activa")

exports.formularioPaciente = async (req, res) => {
  try {
  const nacionalidades = await Nacionalidad.findAll();
  const obrasSociales = await ObraSocial.findAll();

  const obraSocialIds = obrasSociales.map(os => os.id);

  const planes = await Plan.findAll({
    where: {
      obra_social_id: {
        [Op.in]: obraSocialIds
      }
    },
    attributes: ['id', 'nombre_plan', 'obra_social_id']
  });

  res.render('nuevopaciente', {
    nacionalidad: nacionalidades,
    obra_social: obrasSociales,
  });

} catch (error) {
  console.error('Error al cargar datos del formulario:', error);
  res.status(500).send('Error al cargar formulario');
}
};

const path = require('path');
const Paciente = require(path.resolve(__dirname, '../modelo/paciente'));

exports.crearPaciente = async function(req, res) {
  const {
    DNI, Telefono, FechaNacimiento, Email, Contacto_emergencia,
    Nombre, Apellido, Direccion, Genero,
    ID_Nacionalidad, ID_Obra_social, plan_id, numero_afiliado
  } = req.body;

  const errores = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dniRegex = /^[0-9]{7,8}$/;
  const telefonoRegex = /^\+\d{1,3}\d{9}$/;

  // 🔍 Validaciones
  if (!dniRegex.test(DNI)) errores.push("El DNI debe tener 7 u 8 dígitos.");
  if (!telefonoRegex.test(Telefono)) errores.push("Teléfono inválido.");
  if (!emailRegex.test(Email)) errores.push("Email inválido.");
  if (!telefonoRegex.test(Contacto_emergencia)) errores.push("Contacto de emergencia inválido.");

  const hoy = new Date();
  const fechaNacimiento = new Date(FechaNacimiento);
  if (isNaN(fechaNacimiento.getTime()) || fechaNacimiento >= hoy) {
    errores.push("Fecha de nacimiento inválida.");
  }

  if (errores.length > 0) {
    try {
      const nacionalidades = await Nacionalidad.findAll();
      const obrasSociales = await ObraSocial.findAll();
      console.log("Errores encontrados:", errores);
      return res.render('nuevopaciente', {
        errores,
        nacionalidad: nacionalidades,
        obra_social: obrasSociales,
        formData: req.body
      });
    } catch (error) {
      console.error('Error al cargar datos del formulario!:', error);
      return res.status(500).send('Error al cargar formulario');
    }
  }
  

  // 🧾 Guardar en base de datos
  try {
    const objetoPaciente = await Paciente.create({
      Nombre,
      Apellido,
      DNI: String(DNI),
      FechaNacimiento: fechaNacimiento,
      Direccion,
      Telefono,
      Email,
      Genero: Genero.charAt(0).toUpperCase(),
      Contacto_emergencia,
      ID_Nacionalidad,
      ID_Obra_social,
      plan_id,
      numero_afiliado
    });
      const nacionalidades = await Nacionalidad.findAll();
      const obrasSociales = await ObraSocial.findAll();
      res.render('nuevopaciente', {
      exito: 'Paciente registrado correctamente.',
      nacionalidad: nacionalidades,
      obra_social: obrasSociales,
      formData: {} 
    });
  } catch (error) {
    console.error("Error al guardar paciente:", error);

    const nacionalidades = await Nacionalidad.findAll();
    const obrasSociales = await ObraSocial.findAll();

    let errores = ['No se pudo registrar el paciente.'];

    // Si Sequelize trae errores específicos, se agregan
    if (error.errors) {
      errores = error.errors.map(err => err.message);
    }

    return res.render('nuevopaciente', {
      errores,
    });
  }
};

exports.buscarPorDNI = async (req, res) => {
  const dni = req.params.dni;
  try {
    const paciente = await Paciente.findOne({ where: { DNI: dni } });

    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    const plain = paciente.get({ plain: true });
    plain.FechaNacimiento = plain.FechaNacimiento.toISOString().split('T')[0]; // YYYY-MM-DD

    res.json(plain); // ✅ solo una vez
  } catch (error) {
    console.error('Error al buscar paciente:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

exports.actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');
    console.log(req.body);
    await paciente.update(req.body);
    res.redirect('/registro'); // o donde vos prefieras
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar paciente');
  }
};

exports.eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    await Paciente.destroy({ where: { id } });
    res.redirect('/registro');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar paciente');
  }
};

