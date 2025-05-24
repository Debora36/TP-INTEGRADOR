const Nacionalidad = require('../modelo/nacionalidad');
const ObraSocial = require('../modelo/obra_social');
exports.formularioPaciente = async (req, res) => {
  try {
    const nacionalidades = await Nacionalidad.findAll();
    const obrasSociales = await ObraSocial.findAll();
    res.render('nuevopaciente', {
        nacionalidad: nacionalidades,
        obra_social: obrasSociales
    });
  } catch (error) {
    console.error('Error al cargar datos:', error);
    res.status(500).send('Error al cargar formulario');
  }
};