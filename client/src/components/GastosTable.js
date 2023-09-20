import { GastosContext } from "../context/gastosContext"
import { useContext } from "react"
import moment from 'moment'

function GastosTable(){
    const {dataFetch} = useContext(GastosContext)
    return(
        <>
            { (typeof dataFetch?.gastos === 'undefined') 
                ? (<p>Loading....</p>) 
                : <table border="1">
                    <thead>
                        <tr>
                            <th>Gasto</th>
                            <th>Tipo</th>
                            <th>Importe</th>
                            <th>Creado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {(dataFetch.gastos.map((el) => 
                            <tr key={el._id}>
                                <td>{el.gasto}</td>
                                <td>{el.tipo}</td>
                                <td>{Math.floor(el.importe)}</td>
                                <td>{moment(el.createdAt).format('l')}</td>
                                <td>
                                    <a href="/modifica">Modificar</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            } 
        </>
    )
}

export default GastosTable