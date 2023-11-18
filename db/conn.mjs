import { MongoClient } from "mongodb";
// import dotenv from 'dotenv'
// dotenv.config()

const connectionString = process.env.ATLAS_URI || "mongodb+srv://fabgar14:youme4eva@mongopractice.tnhzj4s.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_guides");

export default db;