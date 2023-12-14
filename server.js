import express from 'express'
import path from 'path'
import cors from 'cors'
import gastosRouter from './src/routes/gastosRouter.js'
import userRouter from './src/routes/userRouter.js'
import DBconnection from './src/database/databaseConnection.js'
import config from './src/config/config.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/build')));

//Database Connection
DBconnection();
//Routers
app.use('/api/gastos', gastosRouter)
app.use('/api', userRouter)


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.listen(config.port, () => {console.log(`Server on port 3333`)})