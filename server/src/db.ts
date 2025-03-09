import { MongoClient, Db, ServerApiVersion } from 'mongodb';

class Database {
  private static instance: Database;
  private client: MongoClient;
  private db: Db | null = null;

  private constructor() {
    const uri = process.env.MONGO_CONNECTION_STRING || "";
    this.client = new MongoClient(uri,  {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      }
    );
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try{
      if (!this.db) {
        await this.client.connect();
        this.db = this.client.db(process.env.DB_NAME);
        console.log('Connected to MongoDB');
      }
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
    
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected, please try again');
    }
    return this.db;
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.db = null;
      console.log('MongoDB connection closed');
    }
  }
}

const database = Database.getInstance();
database.connect();
export default database;