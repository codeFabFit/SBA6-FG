import { MongoClient } from "mongodb";
// import dotenv from 'dotenv'
// dotenv.config()

const connectionString = process.env.ATLAS_URI || "mongodb+srv://perscholas:eXr2Or7TX6NLSSCo@mongopractice.xy1fcck.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_planets");

export default db;