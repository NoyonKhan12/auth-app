import express from 'express';
import { register, activate, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/activate/:token', activate);
router.post('/login', login);

export default router;
