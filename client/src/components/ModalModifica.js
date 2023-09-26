import { useContext, useState } from "react"
import { GastosContext } from "../context/gastosContext.js"
const ModalModifica = ({setOpenModalModify, gasto}) => {

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
        console.log(datosFormularioUpdate)
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch(`api/gastos/update/${gasto._id}`, {
            method: 'PUT',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(datosFormularioUpdate)
        }).then(() =>{
            console.log("Cambio actualizado")
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
            <div className="darkBG" onClick={() => setOpenModalModify(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Modificar gasto</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setOpenModalModify(false)}>X</button>
                    <div className="div__form__modifica">
                        <form className='form__modifica'>
                            <label htmlFor="gasto">Gasto</label>
                            <input type="text" placeholder="Gasto" name="gasto" id="gasto" required defaultValue={gasto.gasto} onChange={handleChange}/>
                            <label htmlFor="gasto">Tipo</label>
                            <input type="text" placeholder="Tipo" name="tipo" id="tipo" required defaultValue={gasto.tipo} onChange={handleChange}/>
                            <label htmlFor="gasto">Importe</label>
                            <input type="number" placeholder="Importe" name="importe" id="importe" required defaultValue={gasto.importe} onChange={handleChange}/>
                            <div className='buttons__modal__modify'>
                                <button className="modifyBtn" type="button" onClick={() => {
                                    setOpenModalModify(false)
                                    submitData()}
                                } >Modificar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalModifica