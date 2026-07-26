const Medico = require('../modelo/medico'); // Ajustá la ruta según tus carpetas

exports.mostrarRecepcion = async (req, res) => {
    try {
        const medicos = await Medico.findAll({ order: [['nombre', 'ASC']] });
        res.render('recepcion', { usuario: req.session.usuario, medicos });
    } catch (error) {
        console.error('Error al cargar médicos:', error);
        res.status(500).send('Error al cargar la vista de recepción');
    }
};