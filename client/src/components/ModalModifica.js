import { useContext } from 'react'
import { GastosContext } from '../context/gastosContext.js'

const ModalModifica = ({setOpenModalModify, gasto}) => {

    const { deleteGasto } = useContext(GastosContext)
    console.log(gasto)
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
                            <input type="text" placeholder="Gasto" name="gasto" id="gasto" required />
                            <label htmlFor="gasto">Tipo</label>
                            <input type="text" placeholder="Tipo" name="tipo" id="tipo" required />
                            <label htmlFor="gasto">Importe</label>
                            <input type="number" placeholder="Importe" name="importe" id="importe" required />
                            <div className='buttons__modal__modify'>
                                <button className="modifyBtn" onClick={() => setOpenModalModify(false)}>Modificar</button>
                                {/* <button className="deleteBtn" onClick={() => {
                                    deleteGasto(gasto._id)
                                    setOpenModalModify(false)
                                }}>Eliminar</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalModifica