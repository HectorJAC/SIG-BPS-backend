const validateToken = (req, res, next) => {
    const accessToken = req.header('accessToken');
    if (!accessToken) {
        return res.status(403).send({ message: 'No se proporcionó un token' });
    }
    try {
        const validToken = verify(accessToken, 'secretkey');
        if (validToken) {
            req.user = validToken;
            return next();
        }
    } catch (error) {
        return res.status(403).send({ message: 'Token inválido' });
    }
};

module.exports = validateToken;