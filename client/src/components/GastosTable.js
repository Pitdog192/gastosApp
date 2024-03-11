import { GastosContext } from "../context/gastosContext"
import { useContext, useState, useEffect } from "react"
import ModalModifica from "./ModalModifica.js"
import CreateForm from "./CreateForm.js"
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form'
import TableRow from "./tableRow";
import Importes from "./Importes";
import { SlPlus } from "react-icons/sl";
// Para redireccionar
import { useNavigate } from 'react-router-dom'

function GastosTable() {

    const { actualizadoTabla, setActualizadoTabla } = useContext(GastosContext)
    const [openModalModify, setOpenModalModify] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [dataFetch, setDataFetch] = useState([]) //ESTADO PARA LOS PRODUCTOS
    const [gastoId, setGastoId] = useState()
    const [tipos, setTipos] = useState({})
    const [search, setSearch] = useState('')
    const [tipoSearch, setTipoSearch] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const navigation = useNavigate()
    const arrayMesesTitulo = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await fetch('api/gastos/tipos');
                const data = await response.json();
                setTipos(data);
            } catch (error) {
                console.error('Error fetching tipos:', error);
            }
        };

        const fetchGastos = async () => {
            try {
                const response = await fetch('api/gastos/gasto');
                const data = await response.json();
                if (data.message === 'Unauthorized') {
                    setDataFetch([]);
                    navigation('/');
                } else {
                    const datosFilter = data.gastos.filter((el) => el.muestra === true);
                    datosFilter.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                    setDataFetch(datosFilter);
                    setActualizadoTabla(false);
                }
            } catch (error) {
                console.error('Error fetching gastos:', error);
            }
        };

        fetchTipos();
        fetchGastos();
    }, [actualizadoTabla, setActualizadoTabla, navigation])

    const handleChangeFilter = event => {
        setTipoSearch(event.target.value);
    }
    return (
        <>
            {openModalCreate && <CreateForm tipos={tipos} setOpenModalCreate={setOpenModalCreate} openModalCreate={openModalCreate} />}
            <SlPlus className="boton-fijo" onClick={() => { setOpenModalCreate(true) }} />
            {(typeof dataFetch === 'undefined')
                ? <Spinner animation="border" variant="success" className="mt-5" size="lg" />
                : <div className="table-responsive">
                    <Table bordered variant="success">
                        <thead>
                            <tr>
                                <th colSpan={5}><b style={{ color: 'rgb(0, 195, 255)', fontSize: '25px' }}>{arrayMesesTitulo[fecha.getUTCMonth()]}</b></th>
                            </tr>
                            <tr>
                                {(window.innerWidth < 550) || <th>Fecha</th>}
                                <th>Gasto</th>
                                <th>Tipo</th>
                                <th>Importe</th>
                                <th>Acciones</th>
                            </tr>
                            <tr>
                                {(window.innerWidth < 550) ||
                                    <th><Form.Control type="month" onChange={(e) => {
                                        if (e.target.value !== '') {
                                            setFecha(new Date(e.target.value))
                                        } else {
                                            setFecha(new Date())
                                        }
                                    }} /></th>}
                                <th><Form.Control onChange={(e) => setSearch(e.target.value)} placeholder="Buscar" /></th>
                                <th>
                                    <Form.Select value={tipoSearch} onChange={handleChangeFilter}>
                                        <option value="">Todos</option>
                                        {(typeof tipos === 'undefined')
                                            ? <option>Cargando tipos</option>
                                            : (Array.isArray(tipos.tiposGasto) && tipos.tiposGasto.map((tip => { return (<option key={tip._id} value={tip.tipo.toLocaleLowerCase()}>{tip.tipo}</option>) })))}
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
                                    if (((fecha.getUTCMonth() + 1).toString() === (gastoFecha.getUTCMonth() + 1).toString()) &&
                                        (fecha.getUTCFullYear().toString() === gastoFecha.getUTCFullYear().toString())) {
                                        return (<TableRow key={gasto._id} gasto={gasto} setGastoId={setGastoId} setOpenModalModify={setOpenModalModify} />)
                                    } else {
                                        return undefined
                                    }
                                })
                            )}
                            <tr className="fila_importtotal">
                                <th colSpan={3} className="fila-totales">Total</th>
                                <Importes arrayImportes={document.getElementsByClassName('importes__table')} />
                            </tr>
                        </tbody>
                    </Table>
                </div>
            }
            {openModalModify && <ModalModifica setOpenModalModify={setOpenModalModify} gasto={gastoId} tipos={tipos} openModalModify={openModalModify} />}
        </>
    )
}

export default GastosTable