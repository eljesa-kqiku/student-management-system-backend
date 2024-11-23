import express from 'express'

import { getUsers, getUserById, createUser, editUser, deleteStudent } from '../controllers/students.js';

const router = express.Router();


// all routes in here are starting with /students
router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.patch('/:id', editUser)

router.delete('/:id', deleteStudent)

export default router