import express from 'express'
import userLoginController from '../controllers/userLoginController.js'
import {validateToken} from '../middleware/validateToken.js'

const userRouter = express.Router()

userRouter.post('/register', userLoginController.userRegister)
userRouter.post('/login', userLoginController.userLogin)
userRouter.get('/logout', userLoginController.userLogout)
userRouter.get('/profile', validateToken, userLoginController.showUserProfile)

export default userRouter