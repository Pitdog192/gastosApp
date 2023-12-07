import express from 'express'
import userLoginController from '../controllers/userLoginController.js'

const userRouter = express.Router()

userRouter.post('/register', userLoginController.userRegister)

export default userRouter