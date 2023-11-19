import express from 'express'
const app = express()
const port = 3000
import planets from './routes/planets.mjs'

console.log("we did it")

// Middleware 
app.use(express.json())
app.use('/planets', planets)

// Error Handling Middleware

app.use((err, req, res, next)=> {
    res.status(500).send("Something went wrong!")
})

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`)
})
