import { useContext, useState } from "react"
import { GastosContext } from "../context/gastosContext.js"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const ModalModifica = ({setOpenModalModify, gasto, tipos, openModalModify}) => {
    const {setActualizadoTabla} = useContext(GastosContext)
    const [datosFormularioUpdate, setDatosFormularioUpdate] = useState({
        gasto: gasto.gasto,
        tipo: gasto.tipo,
        importe: gasto.importe
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
            setActualizadoTabla(true)
            setDatosFormularioUpdate({
                gasto: '',
                tipo: '',
                importe: ''
            })
        })
    }

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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpenModalModify(false)}>Cerrar </Button>
                    <Button variant="primary" type="button" onClick={() => {
                                setOpenModalModify(false)
                                submitData()}
                            }>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalModifica