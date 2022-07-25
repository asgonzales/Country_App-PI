import './App.css';
import { Route, Switch } from 'react-router-dom'; //Importo lo componentes de enrutamiento

//Importo los componentes
import Inicio from './components/Inicio/Inicio.jsx';
import Home from './components/Home/Home.jsx';
import Detalles from './components/Detalles/Detalles.jsx';
import Cat from './components/CAT/CAT.jsx';
import Navbar from './components/NavBar/NavBar';
import About from './components/About/About.jsx';








function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = '/' >
          <Inicio />
        </Route>
        <Route path = '/Home'>
          <Navbar /> 
          <Home />
        </Route>
        <Route path='/detalles/:id'>
          <Navbar /> 
          <Detalles />
        </Route>
        <Route path='/Cat'>
          <Navbar /> 
          <Cat />
        </Route>
        <Route path='/About'>
          <Navbar /> 
          <About />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
