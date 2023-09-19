import { createContext, useEffect, useState } from "react";

const GastosContext = createContext();

const GastosProvider = ({children}) => {

    const [dataFetch, setDataFetch] = useState()
    useEffect(() =>{
        try {
            fetch('api/gastos')
            .then(res => res.json())   
            .then(datos => {
            setDataFetch(datos)
            })
        } catch (error) {
            console.log(`Error del fetch: ${error}`)
        }
    }, [])
    const data = {
        dataFetch
    }

    return (
        <GastosContext.Provider value={data}>
            {children}
        </GastosContext.Provider>
    )
}

export default GastosProvider
export {GastosContext}