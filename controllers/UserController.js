const db = require('../database/connection');

const insert = (req, res) => {
    try {
        const result = db.insertUser(req.body.username, req.body.password).then((user) => {
            return res.status(200).json({
                message: "creado exitosamente", user: user
            });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    insert
}