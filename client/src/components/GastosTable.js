import { GastosContext } from "../context/gastosContext"
import { useContext, useState, useEffect } from "react"
import ModalModifica from "./ModalModifica.js"
import moment from 'moment'
import CreateForm from "./CreateForm.js"
import {TbTrashXFilled} from 'react-icons/tb'
import {TbEdit} from 'react-icons/tb'
import Table from 'react-bootstrap/Table';

function GastosTable(){
    const {dataFetch} = useContext(GastosContext)
    const { deleteGasto } = useContext(GastosContext)
    const [openModalModify, setOpenModalModify] = useState(false)
    const [gastoId, setGastoId] = useState()
    const [tipos, setTipos] = useState()
    useEffect(() => {
        try{
            fetch('api/gastos/tipos')
            .then(res => res.json())
            .then((resp) => {
                setTipos(resp)
            })
        } catch(err){
            console.log(err)
        }
    }, [])
    return(
        <>
            <CreateForm tipos={tipos}/>
            { (typeof dataFetch === 'undefined') 
                ? (<p>Loading....</p>) 
                : <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th colSpan={5}>Gastos del mes</th>
                        </tr>
                        <tr>
                            <th>Gasto</th>
                            <th>Tipo</th>
                            <th>Importe</th>
                            <th>Creado</th>
                            <th></th>
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
                                    <div className="container__table__buttons">
                                        <TbEdit className="table__icon__actions green__icon element" onClick={() => {
                                                setOpenModalModify(true)
                                                setGastoId(gasto)
                                            }}/>
                                        <TbTrashXFilled className="table__icon__actions red__icon element" onClick={() => deleteGasto(gasto._id)}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            } 
            {openModalModify && <ModalModifica setOpenModalModify={setOpenModalModify} gasto={gastoId} tipos={tipos} openModalModify={openModalModify}/>}
        </>
    )
}

export default GastosTable