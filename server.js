import express from 'express'
import path from 'path'
import cors from 'cors'
import gastosRouter from './src/routes/gastosRouter.js'
import DBconnection from './src/database/databaseConnection.js'
import config from './src/config/config.js'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')));

//Database Connection
DBconnection();
//Routers
app.use('/api/gastos', gastosRouter)


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.listen(config.port, () => {console.log(`Server on port 3333`)})