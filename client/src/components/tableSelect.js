import Form from 'react-bootstrap/Form';
const TableSelect = ({funcion, tipos}) => {
    return(
        <Form.Select onChange={funcion} name="tipo" id="tipo">
            <option disabled={false}>Tipo</option>
            {(typeof tipos === 'undefined') 
                ? <option>Cargando tipos</option> 
                : (tipos.tiposGasto.map((tip => {return(<option key={tip._id} required>{tip.tipo}</option>)})))}
        </Form.Select>
    )
}

export default TableSelect