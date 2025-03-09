import UserModel, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  async signUp(userData: Omit<IUser, '_id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userModel = new UserModel();

    const newUser = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    };
    const createdUser = await userModel.createUser(newUser);

    return createdUser;
  }

  async login(username: string, password: string): Promise<string> {
    const userModel = new UserModel();

    const user = await userModel.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Wrong username or password');
    }
    return jwt.sign({ id: user._id, username: user.username  }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }
}