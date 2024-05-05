const mysql = require('mysql2');

const configConnection = {
    host: '127.0.0.1',
    port: 3306,
    user: 'admin',
    password: '1234',
    database: 'tiendas_bd'
};

const tablesName = {
    users: 'usuarios',
    stores: 'tiendas',
    items: 'items'
}

let conn;
const connect = async () => {
    conn = mysql.createConnection(configConnection);
    conn.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Conexion exitosa');
        }
    });
};

connect();

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${tablesName.users} WHERE username='${username}' AND password='${password}'`, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    });
}

const findUser = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ${tablesName.users}`, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    });
}

const insertUser = (username, password) => {
    const data = {
        id: null,
        username: username,
        password: password,
    };
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO ${tablesName.users} SET ?`, data, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    });
}

const close = (_conn) => {
    _conn.destroy();
};

module.exports = {
    connect, close, insertUser, findUser, login
}