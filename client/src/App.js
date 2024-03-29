import {React} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GastosProvider from './context/gastosContext.js';
import Home from './pages/Home.js'
import Gastos from './pages/Gastos.js';
import NavBar from './components/NavBar.js'
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <GastosProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/gastos' element={<Gastos />}></Route>
        </Routes>
      </Router>
    </GastosProvider>
  );
}

export default App;
