import express from 'express'

import { getMunicipalities } from '../controllers/default.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/municipalities', verifyToken, getMunicipalities)

export default router