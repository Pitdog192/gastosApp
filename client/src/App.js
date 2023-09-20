import {React} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GastosProvider from './context/gastosContext.js';
import Home from './pages/Home.js'
import Gastos from './pages/Gastos.js';
import NavBar from './components/NavBar.js'
import ModalCarga from './components/ModalCarga.js'
import ModalModifica from './components/ModalModifica.js';
import './styles/App.css';

function App() {
  
  return (
    <GastosProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/gastos' element={<Gastos />}></Route>
          <Route exact path='/cargar' element={<ModalCarga/>}></Route>
          <Route exact path='/modifica' element={<ModalModifica/>}></Route>
        </Routes>
      </Router>
    </GastosProvider>
  );
}

export default App;
