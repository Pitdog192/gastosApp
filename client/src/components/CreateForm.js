import { useState, useContext } from "react"
import { GastosContext } from "../context/gastosContext"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from "sweetalert2";
import TableSelect from "./tableSelect";

const CreateForm = ({tipos}) => {
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
        })
    }
    return(
        <div className="div__form__carga">
            <Form onSubmit={submitData} className="form__carga col-sm-6">
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
                    <Button type="submit" variant="success">Agregar gasto</Button>
                </fieldset>
            </Form>
        </div>
    )
}

export default CreateForm