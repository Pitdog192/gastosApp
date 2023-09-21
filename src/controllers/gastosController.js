import GastoModel from '../models/gastosModel.js'

//METE TODOS LOS GASTOS EN UN ARRAY TEMPORAL Y FILTRA EL QUE SE ESTÁ BUSCANDO POR ID
const getGasto = async (id) => {
    const gastosTemp = []
    const gastosQuery = await GastoModel.find({}).lean()
    let gasto;
    gastosQuery.forEach(el => gastosTemp.push(el))
    for (let i = 0; i < gastosTemp.length; i++) {
        if(id === gastosTemp[i]._id.toString()){
            gasto = gastosTemp[i]
        }
    }
    return gasto
}

//GET FUNCTION
async function getGastos(req, res){
    let id = req.params.id
    if(req.params.id){
        let queryResp = await getGasto(id)
        try{
            (queryResp) ? res.json({queryResp}) : res.json({mensaje: "Gasto no encontrado"})
        } catch(err){
            console.error(err)
        }
    } else {
        const gastos = await GastoModel.find({}).lean()
        res.json({gastos})
    }
}//---------------------------

//CREATE FUNCTION
async function createGasto(req, res){
    console.log(req.body)
    const newGasto = new GastoModel({
        gasto: req.body.gasto,
        tipo: req.body.tipo,
        importe: req.body.importe,
        createdAt: req.body.createdAt
    })
    try{
        await GastoModel.create(newGasto);
        res.json({mensaje: "Ruta createGasto"})
    } catch(err){
        console.error(err)
    }
}//------------------------------


//UPDATE FUNCTION
async function updateGasto(req, res){
    let id = req.params.id
    if(req.params.id){
        let queryResp = await getGasto(id)
        if(queryResp){
            try{
                const gasto = await GastoModel.findOneAndUpdate({_id : queryResp._id.toString()}, req.body, {new: true});
                res.json({mensaje: "Gasto actualizado", update: gasto})
            }catch(err){
                console.error(err)
            }
        } else {
            res.json({mensaje: `Gasto no encontrado con ID: ${id}`})
        }
    }
}//---------------------------------



//DELETE FUNCTION
async function deleteGasto(req, res){
    let id = req.params.id
    console.log(id)
    if(req.params.id){
        let queryResp = await getGasto(id)
        console.log(queryResp)
        if(queryResp){
            try{
                const gasto = await GastoModel.findOneAndUpdate({_id : queryResp._id.toString()}, {muestra: false}, {new: true});
                res.json({mensaje: "Gasto eliminado", update: gasto})
            }catch(err){
                console.error(err)
            }
        } else {
            res.json({mensaje: `Gasto no encontrado con ID: ${id}`})
        }
    }
}//------------------------------

const gastosController = {
    getGastos,
    createGasto,
    updateGasto,
    deleteGasto
}

export default gastosController