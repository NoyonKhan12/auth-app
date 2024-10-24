import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (email: string, password: string, firstName: string, lastName: string, mobileNumber: string) => {
  const existingUser = await User.findOne({ email });
  
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    mobileNumber,
    isActive: false,
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  
  return { user, token };
};

export const activateUser = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) throw new Error('Invalid token');

    user.isActive = true;
    await user.save();
    return user;
  } catch (err) {
    throw new Error('Activation failed');
  }
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !user.isActive) throw new Error('Invalid credentials or account not activated');
  
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) throw new Error('Invalid credentials');
  
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '15m' });
  
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '7d' });
  
    return { user, accessToken, refreshToken };
};