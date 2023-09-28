import { GastosContext } from "../context/gastosContext"
import { useContext, useState } from "react"
import ModalModifica from "./ModalModifica.js"
import moment from 'moment'
import CreateForm from "./CreateForm.js"
import {TbTrashXFilled} from 'react-icons/tb'
import {TbEdit} from 'react-icons/tb'

function GastosTable(){
    const {dataFetch} = useContext(GastosContext)
    const { deleteGasto } = useContext(GastosContext)
    const [ openModalModify, setOpenModalModify] = useState(false)
    const [gastoId, setGastoId] = useState()
    return(
        <>
            <CreateForm/>
            { (typeof dataFetch === 'undefined') 
                ? (<p>Loading....</p>) 
                : <table border="1" className="tabla__gastos">
                    <thead>
                        <tr>
                            <th colSpan={5}>Gastos del mes</th>
                        </tr>
                        <tr>
                            <th>Gasto</th>
                            <th>Tipo</th>
                            <th>Importe</th>
                            <th>Creado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {(dataFetch.map((gasto) => 
                            <tr key={gasto._id}>
                                <td>{gasto.gasto}</td>
                                <td>{gasto.tipo}</td>
                                <td>${Math.floor(gasto.importe)}</td>
                                <td>{moment(gasto.createdAt).format('l')}</td>
                                <td>
                                    <div class="container">
                                        <div class="element"> <TbEdit className="table__icon__actions green__icon" onClick={() => {
                                                setOpenModalModify(true)
                                                setGastoId(gasto)
                                            }}/> 
                                        </div>
                                        <div class="element">
                                            <TbTrashXFilled className="table__icon__actions red__icon" onClick={() => deleteGasto(gasto._id)}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            } 
            {openModalModify && <ModalModifica setOpenModalModify={setOpenModalModify} gasto={gastoId} />}
        </>
    )
}

export default GastosTable