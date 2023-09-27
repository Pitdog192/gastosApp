import { useState, useContext, useEffect } from "react"
import { GastosContext } from "../context/gastosContext"

const CreateForm = () => {
    const {setActualizadoTabla} = useContext(GastosContext)
    const [tipos, setTipos] = useState()
    const [datosFormulario, setDatosFormulario] = useState({
        gasto: '',
        tipo: '',
        importe: ''
    })

    const handleChange = (e) =>{
        //Setea los datos del formulario por name automaticamente
        setDatosFormulario({...datosFormulario, [e.target.name]: e.target.value})
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
                <select onChange={handleChange} name="tipo" id="tipo">
                    <option disabled={false}>Tipo</option>
                    {
                        (typeof tipos === 'undefined') 
                        ? <option>Cargando tipos</option> 
                        : ( tipos.tiposGasto.map((tip => {
                            return(
                                <option key={tip._id} required>{tip.tipo}</option>
                            )
                        })))
                    }
                </select>

                <label htmlFor="gasto">Importe</label>
                <input type="number" placeholder="Importe" name="importe" id="importe" required onChange={handleChange} value={datosFormulario.importe}/>
                
                <button className="deleteBtn">Agregar gasto</button>
            </form>
        </div>
    )
}

export default CreateForm