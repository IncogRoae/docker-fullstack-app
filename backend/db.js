const mysql = require("mysql");
const pool = mysql.createPool({
    connectTimeout: 10,
    host: 'mysql',
    user: 'root',
    password: 'incogroae',
    database: 'myapp'
});
exports.pool = pool;