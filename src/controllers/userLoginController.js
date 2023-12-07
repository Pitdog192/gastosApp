import UserModel from "../models/userLoginModel.js"
import bcrypt from 'bcrypt'

async function userRegister(req, res) {
    try {
        const { userName, userPassword} = req.body
        const passwordHash = await bcrypt.hash(userPassword, 10)
        const newUser = new UserModel({
            userName,
            userPassword: passwordHash
        })
        const userSaved = await newUser.save()
        res.json({
            id: userSaved._id,
            user: userSaved.userName
        })
    } catch (error) {
        res.json(error)
    }
}

const userLoginController = {
    userRegister
}

export default userLoginController