import express from "express"
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb"
const router = express.Router()




// GET ROUTES 
router.get("/", async (req, res)=> {
    const collection = await db.collection("planets") // the collection name 
    const result = await collection.find({}) // this will find the planets and show how many there are 
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
        const { name, description } = req.body;
        const planetsConnection = db.collection('planets')
        const result = await planetsConnection.insertOne({ name, description})

        res.status(201).json(result.ops[0])
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})

//Updated - aka patch - a Planet 

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
          const updtae = { $set: name, description}
          const result = await collection.updateOne(query, update)
          
          if (result.modifiedCount > 0){
            res.status(200).send('Planet updated successfully');
          } else {
            res.status(404).send('Planet not found');
          } 
        }})


// DELETE - delete a Planet by id

router.delete('/planets/:id', async (req, res) => { // Fix the route path and correct the arrow function syntax
  try {
    const planetId = req.params.id; // Fix the syntax for accessing parameters
    // Check if planetId is a valid MongoDB ObjectID
    if (!objectId.isValid(planetId)) { // Correct the object id validation
      return res.status(400).send('Invalid planet ID'); // Correct the status code
    }

    // Continue with your delete logic here
    // For example:
    const collection = await db.collection('planets');
    const query = { _id: new ObjectId(planetId) };
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





// router.delete('/planets/:id', async (req, res) => {
    // router.delete('/planets/:id', async (req, res) => {
    //     try {
    //       const planetId = req.params.id;
      
    //       // Check if planetId is a valid MongoDB ObjectID
    //       if (!ObjectId.isValid(planetId)) {
    //         return res.status(400).send('Invalid planet ID');
    //       }

      
    //       // Delete the planet document by ID
    //       const result = await planetsCollection.deleteOne({ _id: new ObjectID(planetId) });
      
    //       client.close();
      
    //       if (result.deletedCount === 0) {
    //         return res.status(404).send('Planet not found');
    //       }
      
    //       res.json({ message: 'Planet deleted successfully' });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).send('Internal Server Error');
    //     }
    //   });

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