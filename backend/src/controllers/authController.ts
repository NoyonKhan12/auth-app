import { Request, Response } from 'express';
import { registerUser, activateUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, mobileNumber } = req.body;
  try {
    const { user, token } = await registerUser(email, password, firstName, lastName, mobileNumber);
    res.status(201).json({
      message: 'User registered successfully. Activate your account.',
      activationLink: `http://localhost:3000/api/auth/activate/${token}`,
      user,
    });
  } catch (err) {
    const errorMessage = (err as Error).message; 
    res.status(400).json({ error: errorMessage });
  }
};

export const activate = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const user = await activateUser(token);
    res.status(200).json({ message: 'Account activated successfully', user });
  } catch (err) {
    const errorMessage = (err as Error).message;
    res.status(400).json({ error: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const { user, accessToken, refreshToken } = await loginUser(email, password);
      res.status(200).json({
        message: 'Login successful',
        user,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      const error = err as Error; 
      res.status(400).json({ error: error.message });
    }
  };
  