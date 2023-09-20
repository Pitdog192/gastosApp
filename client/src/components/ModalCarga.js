import { useState } from 'react'
const ModalCarga = () => {
    const [datosFormulario, setDatosFormulario] = useState({
        gasto: '',
        tipo: '',
        importe: ''
    })

    const handleChange = (e) =>{
        //Setea los datos del formulario por name automaticamente
        console.log(e.target.value)
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
        }).then(() => console.log("Carga realizada"))
    }

    return(
        <>
            <form onSubmit={submitData}>
                <label htmlFor="gasto">Gasto</label>
                <input type="text" placeholder="Gasto" name="gasto" id="gasto" required onChange={handleChange} value={datosFormulario.gasto}/>

                <label htmlFor="gasto">Tipo</label>
                <input type="text" placeholder="Tipo" name="tipo" id="tipo" required onChange={handleChange} value={datosFormulario.tipo}/>

                <label htmlFor="gasto">Importe</label>
                <input type="number" placeholder="Importe" name="importe" id="importe" required onChange={handleChange} value={datosFormulario.importe}/>

                <button>Cargar</button>
            </form>
        </>
    )
}

export default ModalCarga