import { useState, useContext } from "react"
import { GastosContext } from "../context/gastosContext"

const CreateForm = () => {
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
            console.log("Carga realizada")
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
            <form onSubmit={submitData} className="form__carga">
                <label htmlFor="gasto">Gasto</label>
                <input type="text" placeholder="Gasto" name="gasto" id="gasto" required onChange={handleChange} value={datosFormulario.gasto}/>

                <label htmlFor="gasto">Tipo</label>
                <input type="text" placeholder="Tipo" name="tipo" id="tipo" required onChange={handleChange} value={datosFormulario.tipo}/>

                <label htmlFor="gasto">Importe</label>
                <input type="number" placeholder="Importe" name="importe" id="importe" required onChange={handleChange} value={datosFormulario.importe}/>
                
                <button className="deleteBtn">Agregar gasto</button>
            </form>
        </div>
    )
}

export default CreateForm