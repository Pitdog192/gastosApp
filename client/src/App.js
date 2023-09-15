import {React, useEffect, useState} from 'react'
import './App.css';

function App() {
  
  const [dataFetch, setDataFetch] = useState()

  useEffect(() =>{
      try {
        fetch('/gastos')
        .then(res => res.json())   
        .then(datos => {
          setDataFetch(datos)
        })
      } catch (error) {
        console.log(`Error del fetch: ${error}`)
      }
  }, [])


  return (
    <div className="App">
      {
        (typeof dataFetch?.gastos === 'undefined') 
        ? (<p>Loading....</p>) 
        : (dataFetch.gastos.map((el, i) => <p key={i}>{el.gasto}</p>))
      } 
    </div>
  );
}

export default App;
