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


    router.patch('/planets/:id', async (req, res) => {
        try {
          const planetId = req.params.id;
          const { name, description } = req.body;
      
          // Check if planetId is a valid MongoDB ObjectID
          if (!ObjectID.isValid(planetId)) {
            return res.status(400).send('Invalid planet ID');
          }
      
          // Connect to MongoDB
          const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
          await client.connect();
      
          const db = client.db(dbName);
          const planetsCollection = db.collection('planets');
      
          // Update the planet document by ID
          const result = await planetsCollection.updateOne(
            { _id: new ObjectID(planetId) },
            { $set: { name, description } }
          );
      
          client.close();
      
          if (result.matchedCount === 0) {
            return res.status(404).send('Planet not found');
          }
      
          res.json({ message: 'Planet updated successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });


// DELETE - delete a Planet by id
// router.delete('/planets/:id', async (req, res) => {
    router.delete('/planets/:id', async (req, res) => {
        try {
          const planetId = req.params.id;
      
          // Check if planetId is a valid MongoDB ObjectID
          if (!ObjectID.isValid(planetId)) {
            return res.status(400).send('Invalid planet ID');
          }
      
          // Connect to MongoDB
          const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
          await client.connect();
      
          const db = client.db(dbName);
          const planetsCollection = db.collection('planets');
      
          // Delete the planet document by ID
          const result = await planetsCollection.deleteOne({ _id: new ObjectID(planetId) });
      
          client.close();
      
          if (result.deletedCount === 0) {
            return res.status(404).send('Planet not found');
          }
      
          res.json({ message: 'Planet deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

//     try {
//         const planetId = req.params.id;
//         // const deletePlanet = await planetId.findByIdAndDelete(planetId)
//         if (!ObjectId.isValid(planetId)) { 
//               return
//               res.status(404).send('Planet not found')
//         }
     
// //  catch (error) {
// //         console.error(error)
// //         res.status(500).send('Internal Server Error')
// //     }
// // })

// const result = await planetsConnection.deleteOne({_id: new ObjectId(planetId)})
// client.close();
// if (result.deleteOne === 0){
//     res.status(404).send('PLanet Deleted Successfully')
// } catch (error) {
//     console.error(error)
//     res.status(500).send('Internal Server Error')
// }
// })

export default router;