function roleMiddleware(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: true, message: "Acesso negado" });
        }
        next();
    };
}

export default roleMiddleware;