import UserModel from "../models/userLoginModel.js"
import bcrypt from 'bcrypt'
import accessToken from "../config/jwt.js"

async function userRegister(req, res) {
    const { userName, userPassword} = req.body
    try {
        const passwordHash = await bcrypt.hash(userPassword, 10)
        const newUser = new UserModel({
            userName,
            userPassword: passwordHash
        })
        const userSaved = await newUser.save()
        const token = await accessToken({id: userSaved._id})

        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            user: userSaved.userName
        })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

async function userLogin(req, res){
    const { userName, userPassword} = req.body
    try {
        const userFound = await UserModel.findOne({userName})

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

        const passwordMatch = await bcrypt.compare(userPassword, userFound.userPassword)

        if(!passwordMatch) return res.status(400).json({message: "La contraseña no es correcta"})

        const token = await accessToken({id: userFound._id})
        res.cookie("token", token)
        return res.status(200).json({
            access: true,
            id: userFound._id,
            user: userFound.userName
        })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

function userLogout(req, res) {
    res.cookie('token', '', {
      expires: new Date(0),
      httpOnly: true    // Si la cookie original se configuró como segura (solo se envía sobre HTTPS), asegúrate de que esta configuración coincida
    });
    return res.sendStatus(200);
  }

async function showUserProfile(req, res){
    const userFound = await UserModel.findById(req.user.id)
    if(!userFound) return res.status(400).json({message: "User not found"})
    return res.json({
        id: userFound._id,
        userName: userFound.userName
    })
}

const userLoginController = {
    userRegister,
    userLogin,
    userLogout,
    showUserProfile
}

export default userLoginController