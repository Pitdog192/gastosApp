import GastosTable from '../components/GastosTable.js'
function Gastos(){
    return(
        <main>
            <h1>Pantalla de gastos</h1>
            <div>
                <a href='/cargar'>Cargar Gasto</a>
            </div>
            <GastosTable/>
        </main>
    )
}

export default Gastos