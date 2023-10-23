import { useEffect, useState } from "react"

const Importes = (arrayImportes) => {

    const [importesTotales, setImportesTotales] = useState([])

    useEffect(() => {
        let importe = arrayImportes[Object.keys(arrayImportes)[0]]
        let arr = [].slice.call(importe);
        let tempArr = []
        for (let i = 0; i < arr.length; i++) {
            tempArr.push(parseInt(arr[i].innerHTML.slice(1)))
        }
        setImportesTotales(tempArr)
    }, [arrayImportes])
    
    return(
        <th colSpan={2}>${importesTotales.reduce((a,c) => a + c, 0)}</th>
    )
}

export default Importes