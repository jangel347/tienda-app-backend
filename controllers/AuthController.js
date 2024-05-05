const jwt = require('jsonwebtoken');
const db = require('../database/connection');

const secret = process.env.SECRET;

const auth = async (req, res) => {
    const result = db.login(req.body.username, req.body.password).then((user) => {
        console.log(user);
        if (user.length > 0) {
            const payload = {
                name: req.body.username,
                exp: Date.now() + 60 * 10 * 1000
            };
            const token = jwt.sign(payload, secret);
            return res.status(200).json({
                error: false,
                message: "Sesión iniciada", user: user[0], access_token: token
            });
        } else {
            return res.status(200).json({ message: 'Usuario o contraseña incorretos, intente nuevamente!', error: true });
        }
    });
}

const public = async (req, res) => {
    return res.status(200).json({ message: 'PUBLICO' });
}

const private = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, secret);
        if (Date.now() > payload.exp) {
            return res.status(401).json({ message: 'TOKEN EXPIRADO' });
        }
        return res.status(200).json({ message: 'PRIVADO' });
    } catch (err) {
        return res.status(401).json({ message: 'error =>' + err.message });
    }
}

module.exports = {
    auth, public, private
};

