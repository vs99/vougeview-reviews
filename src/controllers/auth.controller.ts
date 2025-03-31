import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signupUser(userData: Partial<IUser>) {
  await dbConnect();
  const { password } = userData;
  if (!password) throw new Error('Password is required');
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ ...userData, password: hashedPassword });
  return await newUser.save();
}

export async function loginUser(email: string, password: string) {
  await dbConnect();
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  
  // Generate JWT token (make sure JWT_SECRET is set in your .env.local)
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  return { user, token };
}
