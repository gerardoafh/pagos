export function requireRole(allowedRoles) {
  return (req, res, next) => {
    // Se asume que authenticateToken ya se ejecutó y populó req.user
    if (!req.user || !req.user.rol) {
      return res.status(403).json({ error: 'Acceso denegado. Rol no identificado.' });
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ error: `Acceso denegado. Se requiere uno de los siguientes roles: ${allowedRoles.join(', ')}` });
    }

    next();
  };
}
