import express from 'express'
import gastosController from '../controllers/gastosController.js'
import {validateToken} from '../middleware/validateToken.js'
const gastosRouter = express.Router()

gastosRouter.get('/gasto/:id?', validateToken, gastosController.getGastos)
gastosRouter.post('/create', validateToken, gastosController.createGasto)
gastosRouter.put('/update/:id', validateToken, gastosController.updateGasto)
gastosRouter.delete('/delete/:id', validateToken, gastosController.deleteGasto)
gastosRouter.get('/tipos', validateToken, gastosController.getTipos)

export default gastosRouter