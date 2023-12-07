import mongoose from "mongoose"

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
    fecha: {
        type: Date,
        required:true
    },
    muestra: {
        type: Boolean,
        default: true
    }
})

const GastoModel = mongoose.model('gasto', GastoSchema)

export default GastoModel