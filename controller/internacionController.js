const { Internacion, Paciente, Habitacion, AlaHospital } = require('../modelo');


exports.listarInternaciones = async (req, res) => {
  try {
    const internaciones = await Internacion.findAll({
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Habitacion, as: 'habitacion', include: [{ model: AlaHospital, as: 'ala' }] }
      ]
    });
    console.log(internaciones);
    res.render('modificar', {
      usuario: req.session.usuario,
      internaciones
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al listar internaciones');
  }
};

exports.editarInternacion = async (req, res) => {
  try {
    const { fecha } = req.body;
    const { id } = req.params;
    await Internacion.update(
      { FechaIngreso: fecha },
      { where: { ID: id } }
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Error al modificar la internación');
  }
};

exports.eliminarInternacion = async (req, res) => {
  try {
    const { id } = req.params;
    await Internacion.destroy({ where: { ID: id } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Error al eliminar la internación');
  }
};