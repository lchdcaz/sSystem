import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host:"127.0.0.1",
    user:"li",
    password:"1126",
    database:"system",

    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
})

export default pool;