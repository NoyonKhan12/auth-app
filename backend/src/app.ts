import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();



const app = express();

const cors = require('cors');

app.use(cors({
  origin: process.env.EXTERNAL_API_LINK as string, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);

export default app;
