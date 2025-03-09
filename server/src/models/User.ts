import { Collection, ObjectId } from 'mongodb';
import database from '../db';

export interface IUser {
  _id?: ObjectId;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number?: string;
  password: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export default class UserModel {
  private collection: Collection<IUser>;

  constructor() {
    const db = database.getDb();
    this.collection = db.collection<IUser>('users');
  }

  async createUser(user: Omit<IUser, 'created_at' | 'updated_at' | 'deleted_at'>): Promise<IUser> {
    const now = new Date().toISOString();
    const newUser: IUser = {
      ...user,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };
    const result = await this.collection.insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.collection.findOne({ email, deleted_at: null });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.collection.findOne({ username, deleted_at: null });
  }

  async updateUser(id: ObjectId, updates: Partial<IUser>): Promise<void> {
    const now = new Date().toISOString();
    await this.collection.updateOne(
      { _id: id },
      { $set: { ...updates, updated_at: now } }
    );
  }

  async deleteUser(id: ObjectId): Promise<void> {
    const now = new Date().toISOString();
    await this.collection.updateOne(
      { _id: id },
      { $set: { deleted_at: now } }
    );
  }
}