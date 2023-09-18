import mongoose from "mongoose"
import moment from 'moment/moment.js'

const Schema = mongoose.Schema
const GastoSchema = new Schema({
    gasto: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    importe:{
        type: Number,
        required:true
    },
    createdAt: {
        type: Date, 
        default: moment(new Date()).format('l')
    },
    muestra: {
        type: Boolean,
        default: true
    }
})

const GastoModel = mongoose.model('gasto', GastoSchema)

export default GastoModel