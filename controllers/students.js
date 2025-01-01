import { v4 as uuidv4 } from 'uuid';
import pool from '../database.js';

export const getUsers = async (req, res) => {
    const [rows] = await pool.query(`
        SELECT * FROM students;
    `)
    res.send(rows.map(student => ({
        id: student.std_id,
        first_name: student.std_first_name,
        last_name: student.std_last_name,
        index: student.std_index,
        municipality_id: student.std_municipality_id
    })))
}

export const getUserById = async (req, res) => {
    try{ 
        const { id } = req.params
        const [rows] = await pool.query(`
            SELECT * FROM students 
            WHERE std_id = ?
        `, id)
        let student = rows[0]
        if(student)
            res.send({
                id: student.std_id,
                first_name: student.std_first_name,
                last_name: student.std_last_name,
                index: student.std_index,
                municipality_id: student.std_municipality_id
            })
        else
            res.send("Student not found!")
    }catch(error){
        console.log(error)
        res.send("An error occured!")
    }
}

export const createUser = async (req, res) => {
    try{
        const id = uuidv4()
        let student = req.body
        const [rows] = await pool.query(`
            INSERT INTO students(std_id, std_first_name, std_last_name, std_index, std_date_of_birth, std_municipality_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [id, student.first_name, student.last_name, student.index, student.date_of_birth, student.municipality_id])
        let user = req.body
        students.push({...user, id})
        res.send("User saved successfully!")
    }catch(error){
        console.log(error)
        res.send("An error occured!")
    }
}

export const editUser = async (req, res) => {
    try{
        const { id } = req.params
        const student = req.body
        await pool.query(`
            UPDATE students
            SET std_first_name = ?, std_last_name = ?, std_index = ?, std_date_of_birth = ?, std_municipality_id = ?
            WHERE std_id = ?
        `, [student.first_name, student.last_name, student.index, student.date_of_birth, student.municipality_id, id])

        res.send("Student updated successfully!")
    }catch(error){
        console.log(error)
        res.send("An error occured!")
    }
}


export const deleteStudent = async (req, res) => {
    try{
        const { id } = req.params
        await pool.query(`
            DELETE from students
            WHERE std_id = ?
        `, [id])
        
        res.send("Student deleted successfully!")
    }catch(error){
        console.log(error)
        res.send("An error occurred!")
    }
}