import mongoose from 'mongoose'
import config from '../config/config.js'

const DBconnection = async () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(config.mongoUri).then(result => console.log(`Database connected`))
    } catch (error) {
        console.log(error)
    }    
}

export default DBconnection