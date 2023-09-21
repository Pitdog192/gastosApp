import { createContext, useEffect, useState } from "react";

const GastosContext = createContext();

const GastosProvider = ({children}) => {

    //data fectched from api/get
    const [dataFetch, setDataFetch] = useState()
    const [actualizadoTabla, setActualizadoTabla] = useState(true)

    useEffect(() =>{
        try {
            fetch('api/gastos')
            .then(res => res.json())   
            .then(datos => {
            let datosFilter= datos.gastos.filter((el) => el.muestra === true)
            setDataFetch(datosFilter)
            setActualizadoTabla(true)
            })
        } catch (error) {
            console.log(`Error del fetch: ${error}`)
        }
    }, [actualizadoTabla])

    const deleteGasto = (id) => {
        try{
            fetch(`api/gastos/delete/${id}`, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json; charset=UTF-8'}})
            .then(() => setActualizadoTabla(false))
        }catch(err){
            console.log(err)
        }
    }

    const data = {
        dataFetch,
        deleteGasto
    }

    return (
        <GastosContext.Provider value={data}>
            {children}
        </GastosContext.Provider>
    )
}

export default GastosProvider
export {GastosContext}