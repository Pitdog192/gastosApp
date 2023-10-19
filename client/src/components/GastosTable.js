import { GastosContext } from "../context/gastosContext"
import { useContext, useState, useEffect} from "react"
import ModalModifica from "./ModalModifica.js"
import CreateForm from "./CreateForm.js"
import Table from 'react-bootstrap/Table';
import TableRow from "./tableRow";

function GastosTable(){

    const { dataFetch } = useContext(GastosContext)
    const [openModalModify, setOpenModalModify] = useState(false)
    const [gastoId, setGastoId] = useState()
    const [tipos, setTipos] = useState()
    const [search, setSearch] = useState('')
    const [tipoSearch, setTipoSearch] = useState('')
    const [importes, setImportes] = useState([])

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
                            <th></th>
                            <th><input onChange={(e) => {
                                setSearch(e.target.value)
                                setImportes([])
                            }} placeholder="Buscar"/></th>
                            <th><input onChange={(e) => setTipoSearch(e.target.value)} placeholder="Tipo"/></th>
                            <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {(dataFetch
                            .filter((gastos) => {
                                return search.toLowerCase() === ''
                                    ? gastos
                                    : gastos.gasto.toLowerCase().includes(search)
                            })
                            .filter((tipoGasto) => {
                                return tipoSearch.toLocaleLowerCase() === ''
                                    ? tipoGasto
                                    : tipoGasto.tipo.toLocaleLowerCase().includes(tipoSearch)
                            })
                            .map((gasto) => {
                                return( <TableRow key={gasto._id} gasto={gasto} setGastoId={setGastoId} setOpenModalModify={setOpenModalModify} setImportes={setImportes}/> )
                            })
                        )}
                        <tr>
                            <th colSpan={3}>Total</th>
                            <th colSpan={2}>${importes.reduce((a, c) => a + c, 0)}</th>
                        </tr>
                    </tbody>
                </Table>
            } 
            {openModalModify && <ModalModifica setOpenModalModify={setOpenModalModify} gasto={gastoId} tipos={tipos} openModalModify={openModalModify}/>}
        </>
    )
}

export default GastosTable