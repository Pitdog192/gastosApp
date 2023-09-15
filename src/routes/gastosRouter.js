import express from 'express'
import gastosController from '../controllers/gastosController.js'
const gastosRouter = express.Router()

gastosRouter.get('/:id?', gastosController.getGastos)
gastosRouter.post('/create', gastosController.createGasto)
gastosRouter.put('/update/:id', gastosController.updateGasto)
gastosRouter.delete('/delete/:id', gastosController.deleteGasto)

export default gastosRouter