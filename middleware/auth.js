function verificarSesion(req, res, next) {
  if (req.session.usuario) return next();
  res.redirect('/');
}
function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (req.session.usuario && rolesPermitidos.includes(req.session.usuario.rol)) {
      return next();
    }
    res.status(403).send('No tenés permiso para acceder a esta sección');
  };
}
module.exports = { verificarSesion, verificarRol };