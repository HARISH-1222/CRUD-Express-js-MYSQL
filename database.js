let mysql = require("mysql");
const { rootCertificates } = require("tls");

let connect = mysql.createConnection({
    host: 'localhost',
    // database: 'crud',
    user: 'root',
    password: 'root'
})

module.exports = connect;