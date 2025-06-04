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
      console.error('Error al cargar datos del formulario:', error);
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
    console.log("Datos del paciente a guardar:", objetoPaciente);
    res.redirect('/admision');
  } catch (error) {
    if (error.errors) {
      for (let err of error.errors) {
        console.error(`${err.path}: ${err.message}`);
      }
    }
    console.error("Error al guardar paciente:", error);
    res.status(500).send("No se pudo registrar el paciente.");
  }
};

