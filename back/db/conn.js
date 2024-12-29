import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const client = new MongoClient(connectionString);

let conn = null;

try {
  console.log('Connecting to MongoDB...');
  conn = await client.connect();
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Failed to connect to MongoDB:', error);
  throw error;
}

let db = conn.db(dbName);
export default db;

// export default async function connectToDatabase() {
//   let db = null;
//   try {
//     if (conn) return conn;

//     console.log('Connecting to MongoDB...');
//     conn = await client.connect();

//     db = client.db(dbName);
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }

//   return db;
// }
