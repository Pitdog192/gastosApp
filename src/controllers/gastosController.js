import GastoModel from '../models/gastosModel.js'

//GET FUNCTION
async function getGastos(req, res){
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
    //----------------------
    let id = req.params.id //
    if(req.params.id){
        let queryResp = await getGasto(id)
        try{
            (queryResp) ? res.json({queryResp}) : res.json({mensaje: "Gasto no encontrado"})
        } catch(err){
            console.log(err)
        }
    } else {
        const gastos = await GastoModel.find({}).lean()
        res.json({gastos})
    }
}

//CREATE FUNCTION
async function createGasto(req, res){
    console.log(req.body)
    let data = req.body
    const creation = new GastoModel({data})
    await creation.validate();
    res.json({mensaje: "Ruta createGasto"})
}

//UPDATE FUNCTION
async function updateGasto(req, res){
    let id = req.params.id
    try{
        const gasto = await GastoModel.find({_id: id}).lean();
        console.log(gasto)
        //modificarlo con la propiedad necesaria
        gasto.tipo = "Asado"
        await gasto.save()
        res.json({mensaje: "Gasto actualizado", actualizado: gasto})
    }
    catch(err){
        console.log(err)
    }
}

//DELETE FUNCTION
async function deleteGasto(req, res){
    try{
        res.json({mensaje: "Ruta deleteGasto"})
    }
    catch(err){
        console.log(err)
    }
}

const gastosController = {
    getGastos,
    createGasto,
    updateGasto,
    deleteGasto
}

export default gastosController