const mysql = require("mysql2")

const database = "LIBRARY"

const connection = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database
})

module.exports = connection