import jwt from 'jsonwebtoken';

const SECRET = "SEGREDO_SUPER_SECRETO";

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: true, message: "Token não fornecido" });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: true, message: "Token inválido" });
        }
        req.user = decoded;
        next();
    });
}

export default authMiddleware;
export { SECRET };