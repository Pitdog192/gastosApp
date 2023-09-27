import express from 'express'
import gastosController from '../controllers/gastosController.js'
const gastosRouter = express.Router()

gastosRouter.get('/gasto/:id?', gastosController.getGastos)
gastosRouter.post('/create', gastosController.createGasto)
gastosRouter.put('/update/:id', gastosController.updateGasto)
gastosRouter.delete('/delete/:id', gastosController.deleteGasto)
gastosRouter.get('/tipos', gastosController.getTipos)

export default gastosRouter