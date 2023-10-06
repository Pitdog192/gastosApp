import mongoose from "mongoose";

let fecha = new Date();
let fechaCreacion = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
console.log(fechaCreacion)
const Schema = mongoose.Schema;
const tipoGasto = new Schema({
    tipo: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date, 
        default: fechaCreacion
    },
})

const TipoGastoSchema = mongoose.model('tipos', tipoGasto)
export default TipoGastoSchema