import express from 'express'

import { getUsers, getUserById, createUser, editUser, deleteStudent, testStudent } from '../controllers/students.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();


// all routes in here are starting with /students
router.get('/', verifyToken, getUsers)

router.get('/:id', verifyToken, getUserById)

router.post('/', verifyToken, createUser)

router.patch('/:id', verifyToken, editUser)

router.delete('/:id', verifyToken, deleteStudent)

router.get('/test', testStudent)
export default router