import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"
const router = express.Router()


// ======== POST - create a Planet =========
router.post('/:id', async (req,res) => {
  try {
      const { name, description } = req.body;
      const planetsConnection = db.collection('planets')
      const result = await planetsConnection.insertOne({ name, description})

      res.status(201).json(result.ops[0])
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error")
  }
})


// ====== GET ROUTES =======
router.get("/", async (req, res)=> {
  console.log("monkeys")
  try {
    // const planet = await planet.find()
    // res.json(planet)
    const collection = await db.collection("planets") // the collection name 
    const result = await collection.find({}).limit(11).toArray()
    console.log(result)
      // this will find the planets and show how many there are 
      res.status(201).json(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


// ====== GET - Show - get one Planet ========
router.get('/:id', async (req, res) => {
    const collection = await db.collection("planets")
    const query = {_id: new ObjectId(req.params.id)}
    const results = await collection.findOne(query)

    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200)
})

// // ======== POST - create a Planet =========
// router.post('/:id', async (req,res) => {
//     try {
//         const { name, description } = req.body;
//         const planetsConnection = db.collection('planets')
//         const result = await planetsConnection.insertOne({ name, description})

//         res.status(201).json(result.ops[0])
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error")
//     }
// })

// ===== Updated - aka patch - a Planet ========

    router.patch('/:id', async (req, res) => {
       {
          const planetId = req.params.id;
          const { name, description } = req.body;
      
          // Check if planetId is a valid MongoDB ObjectID
          if (!ObjectId.isValid(planetId)) {
            return res.status(400).send('Invalid planet ID');
          }
      
          const collection = await db.collection('planets')
          const query = { _id: new ObjectId(planetId)}
          const update = { $set:{"name": name }}
          const result = await collection.updateOne(query, update)
      
          // if (result.modifiedCount > 1){
          //   res.status(200).send('Planet updated successfully');
          // } else {
          //   res.status(404).send('Planet not found');
          // } 
        }})


// ======   DELETE - delete a Planet by id =======

router.delete('/:id', async (req, res) => { 
  console.log("hello world")
  try {
    const planetId = req.params.id; 
    // Check if planetId is a valid MongoDB ObjectID
    if (!ObjectId.isValid(planetId)) { // Correct the object id validation
      return res.status(400).send('Invalid planet ID'); 
    }

    const collection = await db.collection('planets');
    const query = { _id: new ObjectId(planetId) };
    console.log(query)
    const result = await collection.deleteOne(query);

    // Check if the deletion was successful
    if (result.deletedCount > 0) {
      res.status(200).send('Planet deleted successfully');
    } else {
      res.status(404).send('Planet not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});



export default router;