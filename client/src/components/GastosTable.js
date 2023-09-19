import { GastosContext } from "../context/gastosContext"
import { useContext } from "react"
import moment from 'moment'

function GastosTable(){
    const {dataFetch} = useContext(GastosContext)
    console.log(dataFetch)
    return(
        <>
            <table border="1">
                <thead>
                    <tr>
                        <th>Gasto</th>
                        <th>Tipo</th>
                        <th>Importe</th>
                        <th>Creado</th>
                    </tr>
                </thead>
                <tbody>
                { (typeof dataFetch?.gastos === 'undefined') 
                    ? (<p>Loading....</p>) 
                    : (dataFetch.gastos.map((el, i) => <tr key={el._id}>
                        <td>{el.gasto}</td>
                        <td>{el.tipo}</td>
                        <td>{el.importe}</td>
                        <td>{moment(el.createdAt).format('L')}</td>
                    </tr>))
                } 
                </tbody>
            </table>
        </>
    )
}

export default GastosTable