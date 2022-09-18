import './App.css';
import { Route, Switch } from 'react-router-dom'; //Importo lo componentes de enrutamiento

//Importo los componentes
import Inicio from './components/Inicio/Inicio.jsx';
import Home from './components/Home/Home.jsx';
import Detalles from './components/Detalles/Detalles.jsx';
import Cat from './components/CAT/CAT.jsx';
import Navbar from './components/NavBar/NavBar';
import About from './components/About/About.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';








function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = '/' >
          <Inicio />
        </Route>
        <Route exact path = '/Home'>
          <Navbar /> 
          <Home />
        </Route>
        <Route exact path='/detalles/:id'>
          <Navbar /> 
          <Detalles />
        </Route>
        <Route exact path='/Cat'>
          <Navbar /> 
          <Cat />
        </Route>
        <Route exact path='/About'>
          <Navbar /> 
          <About />
        </Route>
        <Route path='/*'>
          <Navbar />
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
