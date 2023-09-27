import mongoose from "mongoose";
import moment from 'moment/moment.js'

const Schema = mongoose.Schema;
const tipoGasto = new Schema({
    tipo: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date, 
        default: moment(new Date()).format('l')
    },
})

const TipoGastoSchema = mongoose.model('tipos', tipoGasto)
export default TipoGastoSchema