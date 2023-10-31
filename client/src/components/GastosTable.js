import { GastosContext } from "../context/gastosContext"
import { useContext, useState, useEffect} from "react"
import ModalModifica from "./ModalModifica.js"
import CreateForm from "./CreateForm.js"
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import TableRow from "./tableRow";
import Importes from "./Importes";
import { SlPlus } from "react-icons/sl";

function GastosTable(){

    const { dataFetch } = useContext(GastosContext)
    const [openModalModify, setOpenModalModify] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [gastoId, setGastoId] = useState()
    const [tipos, setTipos] = useState()
    const [search, setSearch] = useState('')
    const [tipoSearch, setTipoSearch] = useState('')
    const [fecha, setFecha] = useState(new Date())

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

    const handleChangeFilter = event => {
        setTipoSearch(event.target.value);
    }
    return(
        <>
            {openModalCreate && <CreateForm tipos={tipos} setOpenModalCreate={setOpenModalCreate} openModalCreate={openModalCreate}/>}
            <SlPlus className="boton-fijo" onClick={() => {setOpenModalCreate(true)}}/>
            { (typeof dataFetch === 'undefined') 
                ? (<p>Loading....</p>) 
                : <Table bordered variant="success" className="container">
                    <thead>
                        <tr>
                            <th colSpan={5}>Gastos del mes</th>
                            
                        </tr>
                        <tr>
                            <th><Form.Control type="month" onChange={(e) => {
                                if(e.target.value !== ''){
                                    setFecha(new Date(e.target.value))
                                } else {
                                    setFecha(new Date())
                                }
                            }}/></th>
                            <th><Form.Control onChange={(e) => setSearch(e.target.value)} placeholder="Buscar"/></th>
                            {/* <th><Form.Control onChange={(e) => setTipoSearch(e.target.value)} placeholder="Tipo"/></th> */}
                            <th>
                                <Form.Select value={tipoSearch} onChange={handleChangeFilter}>
                                    <option value="">Todos</option>
                                    {(typeof tipos === 'undefined') 
                                        ? <option>Cargando tipos</option> 
                                        : (tipos.tiposGasto.map((tip => {return(<option key={tip._id} value={tip.tipo.toLocaleLowerCase()}>{tip.tipo}</option>)})))}
                                </Form.Select>
                            </th>
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
                                let gastoFecha = new Date(gasto.fecha)
                                if((fecha.getUTCMonth() + 1).toString() === (gastoFecha.getUTCMonth() + 1).toString()){
                                    return( <TableRow key={gasto._id} gasto={gasto} setGastoId={setGastoId} setOpenModalModify={setOpenModalModify} /> )
                                }  else {
                                    return undefined
                                }
                            })
                        )}
                        <tr>
                            <th colSpan={3} className="fila-totales">Total</th>
                            <Importes arrayImportes={document.getElementsByClassName('importes__table')}/>
                        </tr>
                    </tbody>
                </Table>
            } 
            {openModalModify && <ModalModifica setOpenModalModify={setOpenModalModify} gasto={gastoId} tipos={tipos} openModalModify={openModalModify}/>}
        </>
    )
}

export default GastosTable