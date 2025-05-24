const Ala = require('../modelo/ala_hospital');

exports.formularioAdmision = async (req, res) => {
  try {
    const alas = await Ala.findAll();
    res.render('admision', {
        ala_hospital: alas
    });
  } catch (error) {
    console.error('Error al cargar datos:', error);
    res.status(500).send('Error al cargar formulario');
  }
};