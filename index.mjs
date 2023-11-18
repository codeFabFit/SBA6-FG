import express from "express"
const app = express()
const port = 5000


// Error Handling Middleware

app.use((err, req, res, next)=> {
    res.status(500).send("Something went wrong!")
})

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`)
})
