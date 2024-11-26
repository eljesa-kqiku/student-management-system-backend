import express from "express";
import bodyParser from 'body-parser'

import studentsRoutes from './routes/students.js'
import loginRoutes from './routes/auth.js'

const app = express()
const PORT = 5000;

app.use(bodyParser.json())

app.use('/students', studentsRoutes)
app.use('/auth', loginRoutes)

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)

)