import { useState, useContext } from "react"
import { GastosContext } from "../context/gastosContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
import TableSelect from "./tableSelect";
import Modal from 'react-bootstrap/Modal'

const CreateForm = ({tipos, setOpenModalCreate, openModalCreate}) => {
    const {setActualizadoTabla} = useContext(GastosContext)
    const [datosFormulario, setDatosFormulario] = useState({
        gasto: '',
        tipo: '',
        importe: ''
    })

    const handleChange = (e) =>{
        //Setea los datos del formulario por name automaticamente
        setDatosFormulario({...datosFormulario, [e.target.name]: e.target.value})
    }

    const submitData = (e) => {
        e.preventDefault()
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('/api/gastos/create', {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(datosFormulario)
        }).then(() =>{
            Swal.fire({
                title: `${datosFormulario.gasto} cargado con éxito!`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            setActualizadoTabla(true)
            setDatosFormulario({
                gasto: '',
                tipo: '',
                importe: ''
            })
            setOpenModalCreate(false)
        })
    }
    return(
        <>
            <Modal show={openModalCreate}>
                <Form onSubmit={submitData} className="form__carga">
                <Modal.Header>
                    <Modal.Title>Cargar</Modal.Title>
                    <Button variant="danger" onClick={() => setOpenModalCreate(false)}>X</Button>
                </Modal.Header>
                <Modal.Body>
                        <fieldset>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="gasto">Gasto</Form.Label>
                                <Form.Control placeholder="Gasto" name="gasto" id="gasto" required onChange={handleChange} value={datosFormulario.gasto}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="tipo">Tipo</Form.Label>
                                <TableSelect funcion={handleChange} tipos={tipos}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="importe">Importe</Form.Label>
                                <Form.Control type="number" placeholder="Importe" name="importe" id="importe" required onChange={handleChange} value={datosFormulario.importe}/>
                            </Form.Group>
                        </fieldset>
                </Modal.Body>
                <Modal.Footer>
                            <Button type="submit" variant="success">Agregar gasto</Button>
                            <Button variant="warning" onClick={() => setOpenModalCreate(false)}>Cancelar</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default CreateForm