import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"
const router = express.Router()




// GET ROUTES 
router.get("/", async (req, res)=> {
    const collection = await db.collection("planets") // the collection name 
    const results = await collection.find({}).limit(8).toArray // this will find the planets and show how many there are 
})

// GET - Show - get one Planet 
router.get('/:id', async (req, res) => {
    const collection = await db.collection("planets")
    const query = {_id: new ObjectId(req.params.id)}
    const results = await collection.findOne(query)

    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200)
})

// POST - create a Planet 
router.post('/:id', async (req,res) => {
    try {
        const {name, description} = req.body;
        const planetsConnection = db.collection('planets')
        const result = await planetsConnection.insertOne('planets')

        res.status(201).json(result.ops[0])
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})

//Updated - aka patch - a Planet 


// DELETE - delete a Planet
router.delete('/planets/:id', async (req, res) => {
    try {
        const planetId = req.params.id
        const deletePlanet = await planetId.Delete(planetId)
        if (!deletedPlanet) 
              return
              res.status(404).send('Planet not found')
        }
     
 catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})

export default router;