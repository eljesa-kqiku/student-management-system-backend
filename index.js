import express from "express";
import bodyParser from 'body-parser'

import studentsRoutes from './routes/students.js'

const app = express()
const PORT = 5000;

app.use(bodyParser.json())

app.use('/students', studentsRoutes)

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)

)