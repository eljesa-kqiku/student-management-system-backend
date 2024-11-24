import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getStudents(){
    const [result] = await pool.query("select * from students")
    return result
}

async function getStudentById(id) {
    const [rows] = await pool.query(`
        select * from students where std_id = ?
        `, id)

    return rows[0]
}

export default pool;