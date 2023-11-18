import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"
const router = express.Router()

// GET ROUTES 
router.get("/", async (req, res)=> {
    const collection = await db.collection("planets") // the collection name 
    const result = await collection.find({}).limit(8).toArray // this will find the planets and show how many there are 
})

// GET - Show - get one Planet 


// POST - create a Planet 


//Updated - aka patch - a Planet 


// DELETE - delete a Planet


export default router;