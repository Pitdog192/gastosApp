import mongoose from "mongoose"

const Schema = mongoose.Schema
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    userPassword: {
        type: String,
        required: true,
        trim: true
    }
},
{timestamps:true})

const UserModel = mongoose.model('users', userSchema)
export default UserModel