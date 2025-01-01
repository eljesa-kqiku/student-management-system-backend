import express, {json} from "express";
// import bodyParser from 'body-parser'
import cors from 'cors'
import studentsRoutes from './routes/students.js'
import loginRoutes from './routes/auth.js'

const app = express()
const PORT = 5000;
const HOST = '0.0.0.0';

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin'],
}))
app.use(express.json())
// app.use(bodyParser.json())

app.use('/students', studentsRoutes)
app.use('/auth', loginRoutes)

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(PORT, HOST, () => console.log(`Server running on port: http://${HOST}:${PORT}`)

)