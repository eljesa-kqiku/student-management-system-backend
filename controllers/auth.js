import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../database.js'
import {v4 as uuidv4} from 'uuid';

export const register = async (req, res) => {
    try{
        const {username, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const user_id = uuidv4()
        const [rows, fields] = await pool.query(
            "INSERT INTO users(user_id, user_username, user_email, user_password) VALUES (?, ?, ?, ?)",
            [user_id, username, email, hashedPassword]
        )
        res.status(201).json({message: "User registered successfully!"})
    }catch(err){
        console.error("Error registering user", err)
        res.status(500).json({message: "Server Error"})
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const [rows, fields] = await pool.query(
            "SELECT * FROM users WHERE user_email = ?", [email]
        )
        if(rows.length === 0){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const user = rows[0];
        const isPasswordMatch = password === user.user_password
        // const isPasswordMatch = await bcrypt.compare(password, user.user_password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY, {expiresIn: '12h'})
        res.json({user, token});
    }catch(err){
        console.error("Error logging in", err)
        res.status(500).json({message:"Server Error"})
    }
}

export const userData = async (req, res) => {
    try{
        const {user_id} = req.body
        const [rows, fields] = await pool.query(
            "SELECT * FROM users WHERE user_id = ?", [user_id]
        )
        if(rows.length === 0){
            return res.status(400).json({message:"Invalid user id"})
        }
        const user = rows[0];
        res.json({user});
    }catch(err){
        console.error("Error", err)
        res.status(500).json({message:"Server Error"})
    }
}