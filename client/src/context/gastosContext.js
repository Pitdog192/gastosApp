import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const GastosContext = createContext();

const GastosProvider = ({children}) => {

    //data fectched from api/get
    const [dataFetch, setDataFetch] = useState()
    const [actualizadoTabla, setActualizadoTabla] = useState(true)

    useEffect(() =>{
        try {
            fetch('api/gastos/gasto')
            .then(res => res.json())   
            .then(datos => {
                let datosFilter = datos.gastos.filter((el) => el.muestra === true)
                setDataFetch(datosFilter)
                setActualizadoTabla(false)
            })
        } catch (error) {
            console.log(`Error del fetch: ${error}`)
        }
    }, [actualizadoTabla])

    const deleteGasto = (id) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este gasto?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
            background: '#198754',
            color: '#fff',
            confirmButtonColor: '#83d36d'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try{
                    fetch(`api/gastos/delete/${id}`, {
                        method: 'DELETE',
                        headers: {'Content-type': 'application/json; charset=UTF-8'}})
                    .then(() => setActualizadoTabla(true))
                    Swal.fire({
                        title: '¡Eliminado!',
                        icon: 'success',
                        timer: 1200,
                        showConfirmButton: false,
                    })
                }catch(err){
                    console.log(err)
                }
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Gasto no eliminado',
                    icon: 'info',
                    timer: 1200,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        })
        
    }

    const formateoFecha = (fechaParam) => {
        const fecha = new Date(fechaParam);
        fecha.setUTCHours(0, 0, 0, 0); // Establecer la hora en UTC
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth() + 1; // Sumamos 1 porque los meses comienzan desde 0 (enero) hasta 11 (diciembre)
        const anio = fecha.getUTCFullYear();
        // Asegurémonos de que el día y el mes tengan el formato 'dd/mm'
        const diaFormateado = dia < 10 ? '0' + dia : dia;
        const mesFormateado = mes < 10 ? '0' + mes : mes;
        const fechaTransformada = `${diaFormateado}/${mesFormateado}/${anio}`;
        return fechaTransformada
    }

    const data = {
        dataFetch,
        setDataFetch,
        deleteGasto,
        setActualizadoTabla,
        formateoFecha
    }

    return (
        <GastosContext.Provider value={data}>
            {children}
        </GastosContext.Provider>
    )
}

export default GastosProvider
export {GastosContext}