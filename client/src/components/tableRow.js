import { GastosContext } from "../context/gastosContext"
import { useContext} from "react"
import {TbTrashXFilled} from 'react-icons/tb'
import {TbEdit} from 'react-icons/tb'

function TableRow ({gasto, setGastoId, setOpenModalModify}) {
    
    const { deleteGasto, formateoFecha } = useContext(GastosContext)
    let gastoTipoClass
    switch (gasto.tipo) {
        case "Comida": gastoTipoClass = "bg-success"
            break;
        case "Medicina": gastoTipoClass = "bg-success"
            break;
        case "Gusto": gastoTipoClass = "bg-warning"
            break;
        case "Salida": gastoTipoClass = "bg-danger"
            break;
        case "Importante": gastoTipoClass = "bg-primary"
            break;
        default: gastoTipoClass = ""
            break;
    }

    return (
        <tr>
            {(window.innerWidth < 550) || <td>{formateoFecha(gasto.fecha)}</td>}
            <td>{gasto.gasto}</td>
            <td className={`${gastoTipoClass} bg-gradient`}>{gasto.tipo}</td>
            <td className="importes__table">${Math.floor(gasto.importe)}</td>
            <td>
                <div className="container__table__buttons">
                    <TbEdit className="table__icon__actions green__icon element" onClick={() => {
                            setOpenModalModify(true)
                            setGastoId(gasto)
                        }}/>
                    <TbTrashXFilled className="table__icon__actions red__icon element" onClick={() => deleteGasto(gasto._id)}/>
                </div>
            </td>
        </tr>
    )
}

export default TableRow