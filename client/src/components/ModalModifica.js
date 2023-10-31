import { useContext, useState } from "react"
import { GastosContext } from "../context/gastosContext.js"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Swal from "sweetalert2"

const ModalModifica = ({setOpenModalModify, gasto, tipos, openModalModify}) => {
    const {setActualizadoTabla, formateoFecha} = useContext(GastosContext)
    const [datosFormularioUpdate, setDatosFormularioUpdate] = useState({
        gasto: gasto.gasto,
        tipo: gasto.tipo,
        importe: gasto.importe,
        fecha: gasto.fecha
    })
    const handleChange = (e) =>{
        //Setea los datos del formulario por name automaticamente
        setDatosFormularioUpdate({...datosFormularioUpdate, [e.target.name]: e.target.value})
    }
    const submitData = () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch(`api/gastos/update/${gasto._id}`, {
            method: 'PUT',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(datosFormularioUpdate)
        }).then(() =>{
            Swal.fire({
                title: `Gasto actualizado con éxito ${datosFormularioUpdate.gasto}, ${datosFormularioUpdate.tipo}, $${datosFormularioUpdate.importe}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            setActualizadoTabla(true)
            setDatosFormularioUpdate({
                gasto: '',
                tipo: '',
                importe: '',
                fecha: ''
            })
        })
    }
    const partes = formateoFecha(gasto.fecha).split('/'); 
    const fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return(
        <>
            <Modal show={openModalModify}>
                <Modal.Header>
                    <Modal.Title>Modificación</Modal.Title>
                    <Button variant="danger" onClick={() => setOpenModalModify(false)}>X</Button>
                </Modal.Header>
                <Modal.Body>
                    <Form className="form__carga col-sm-12">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="gasto">Gasto</Form.Label>
                            <Form.Control type="text" placeholder="Gasto" name="gasto" id="gasto" required defaultValue={gasto.gasto} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="tipo">Tipo</Form.Label>
                            <Form.Select onChange={handleChange} name="tipo" id="tipo">
                                <option disabled={false} defaultValue={gasto.tipo}>{gasto.tipo}</option>
                                {
                                    (typeof tipos === 'undefined') 
                                    ? <option>Cargando tipos</option> 
                                    : ( tipos.tiposGasto.map((tip => {
                                        return(
                                            <option key={tip._id} required>{tip.tipo}</option>
                                        )
                                    })))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="importe">Importe</Form.Label>
                            <Form.Control type="number" placeholder="Importe" name="importe" id="importe" required defaultValue={gasto.importe} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="importe">Importe</Form.Label>
                            <Form.Control type="date" name="fecha" id="fecha" required defaultValue={fechaFormateada} onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="button" onClick={() => {
                                setOpenModalModify(false)
                                submitData()}
                            }>Guardar Cambios
                    </Button>
                    <Button variant="secondary" onClick={() => setOpenModalModify(false)}>Cerrar </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalModifica