import { GastosContext } from "../context/gastosContext"
import { useContext, useState, useEffect } from "react"
import ModalModifica from "./ModalModifica.js"
import CreateForm from "./CreateForm.js"
import {TbTrashXFilled} from 'react-icons/tb'
import {TbEdit} from 'react-icons/tb'
import Table from 'react-bootstrap/Table';

function GastosTable(){
    const { dataFetch } = useContext(GastosContext)
    const { deleteGasto } = useContext(GastosContext)
    const [openModalModify, setOpenModalModify] = useState(false)
    const [gastoId, setGastoId] = useState()
    const [tipos, setTipos] = useState()
    let arrayImportes = []
    let importeTotal;

    if(typeof dataFetch === 'undefined'){
        console.log("Cargando")
    } else {
        dataFetch.map((item) => {
            return arrayImportes.push(item.importe)
        })
        importeTotal = arrayImportes.reduce((acc, cur) => acc + cur + 0)
    }

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
                : <Table bordered variant="dark">
                    <thead>
                        <tr>
                            <th colSpan={5}>Gastos del mes</th>
                        </tr>
                        <tr>
                            <th>Creado</th>
                            <th>Gasto</th>
                            <th>Tipo</th>
                            <th>Importe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {(dataFetch.map((gasto) => {
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
                            return(
                                <tr key={gasto._id}>
                                    <td>{fechaGasto}</td>
                                    <td>{gasto.gasto}</td>
                                    <td className={`${gastoTipoClass} bg-gradient`}>{gasto.tipo}</td>
                                    <td>${Math.floor(gasto.importe)}</td>
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
                        ))}
                        <tr>
                            <th colSpan={3}>Total</th>
                            <th colSpan={2}>${importeTotal}</th>
                        </tr>
                    </tbody>
                </Table>
            } 
            {openModalModify && <ModalModifica setOpenModalModify={setOpenModalModify} gasto={gastoId} tipos={tipos} openModalModify={openModalModify}/>}
        </>
    )
}

export default GastosTable