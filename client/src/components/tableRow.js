import { GastosContext } from "../context/gastosContext"
import { useContext} from "react"
import {TbTrashXFilled} from 'react-icons/tb'
import {TbEdit} from 'react-icons/tb'

function TableRow ({gasto, setGastoId, setOpenModalModify}) {

    const { deleteGasto } = useContext(GastosContext)
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
        default: gastoTipoClass = ""
            break;
    }
    let fechaCreacion = new Date(gasto.createdAt)
    let fechaGasto = `${fechaCreacion.getDate()}/${fechaCreacion.getMonth()}/${fechaCreacion.getFullYear()}`;

    return (
        <tr>
            <td>{fechaGasto}</td>
            <td>{gasto.gasto}</td>
            <td className={`${gastoTipoClass} bg-gradient`}>{gasto.tipo}</td>
            <td id="importes__table">${Math.floor(gasto.importe)}</td>
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