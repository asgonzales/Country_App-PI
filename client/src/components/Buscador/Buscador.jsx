import styles from './Buscador.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesFilter } from '../../redux/actions/countries';
import { getFilters } from '../../redux/actions/activities';
import { useEffect, useState } from 'react';

function Buscador () {
    const dispatch = useDispatch()
    const effect = useEffect;

    //Llamo a las variables de filtrado por actividad
    let actName = useSelector(state => state.actName) //Nombres traídos de la BD
    let actDur = useSelector(state => state.actDur) //Duraciones traídas de la BD
    let datosEnBase = useSelector(state => state.datosEnBase)

    //variables para la búsqueda de países.
    const [ name, setName ] = useState('')
    const [ alph, setAlph ] = useState('')
    const [ pobl, setPobl ] = useState('')
    const [ continent, setContinent ] = useState([])
    const [ actvName, setActvName ] = useState([])
    const [ actvDiff, setActvDiff ] = useState([])
    const [ actvDur, setActvDur ] = useState([])
    const [ actvSeas, setActvSeas ] =useState([])

    //Obtengo los valores del filtro por actividades
    effect(() => {
        dispatch(getFilters('name')) 
        dispatch(getFilters('duration')) 
    }, [dispatch])

    //Funcion handle de nombre
    const handleCountryName = (e) => {
        setName(e.target.value)
    }
    //Funcion handle de alph
    const handleAlph = (e) => {
        setPobl('')
        if(e.target.innerText === 'A - Z') {
            e.target.innerText = 'Z - A'
            setAlph('desc')
        } 
        else {
            e.target.innerText = 'A - Z'
            setAlph('asc')
        } 
    }
    //Funcion handle de pobl
    const handlePobl = (e) => {
        setAlph('')
        if(e.target.innerText === 'Pobl: asc') {
            e.target.innerText = 'Pobl: desc'
            setPobl('desc')
        } 
        else {
            e.target.innerText = 'Pobl: asc'
            setPobl('asc')
        } 
    }

    effect( () => { //Handle que marca si los paises están ordenados
        if(!alph) document.querySelector('#alphOrd').className = styles.btnorder
        else document.querySelector('#alphOrd').className = styles.btnselected
        if(!pobl) document.querySelector('#poblOrd').className = styles.btnorder
        else document.querySelector('#poblOrd').className = styles.btnselected
    },[alph, pobl])

    //Funcion handl de continent
    const handleContinent = (e) => {
        if(e.target.checked) setContinent([...continent, e.target.name])
        else setContinent(continent.filter( el => el !== e.target.name))
    }
    //Funcion handle de nombre de actividades
    const handleActvName = (e) => {
        if(e.target.checked) setActvName([...actvName, e.target.name])
        else setActvName(actvName.filter(el => el !== e.target.name))
    }
    //Funcion handle de dificultad de actividades
    const handleActvDiff = (e) => {
        if(e.target.checked) setActvDiff([...actvDiff, e.target.name])
        else setActvDiff(actvDiff.filter(el => el !== e.target.name))
    }
    //Funcion handle de duracion de actividades
    const handleActvDur = (e) => {
        if(e.target.checked) setActvDur([...actvDur, e.target.name])
        else setActvDur(actvDur.filter(el => el !== e.target.name))
    }
    //Funcion handle de estacion de actividades
    const handleActvSeas = (e) => {
        if(e.target.checked) setActvSeas([...actvSeas, e.target.name])
        else {
            setActvSeas(actvSeas.filter(el => el!==e.target.name))
        } 
    }

    //Cada vez que hay cambios en las variables de búsqueda se realiza una nueva búsqueda
    effect(() => {
        if(datosEnBase) buscar()
        if(actvName.length > 0) document.querySelector('#actvName').className = styles.tituloSelected
        else document.querySelector('#actvName').className = styles.titulos
        if(actvDiff.length > 0) document.querySelector('#actvDiff').className = styles.tituloSelected
        else document.querySelector('#actvDiff').className = styles.titulos
        if(actvDur.length > 0) document.querySelector('#actvDur').className = styles.tituloSelected
        else document.querySelector('#actvDur').className = styles.titulos
        if(actvSeas.length > 0) document.querySelector('#actvTemp').className = styles.tituloSelected
        else document.querySelector('#actvTemp').className = styles.titulos
        if(continent.length > 0) document.querySelector('#Continent').className = styles.tituloSelected
        else document.querySelector('#Continent').className = styles.titulos
    }, [name, alph, pobl, continent, actvName, actvDiff, actvDur, actvSeas])

    const buscar = () => {
        dispatch(getCountriesFilter(name, alph, pobl, continent, actvName, actvDiff, actvDur, actvSeas))
    }
    
    return (
        <div className={styles.Buscador}>
            <div className={styles.headers}>
                <div className={styles.headerActv}>
                    <h5>Por Actividades: </h5>
                </div>
                <div className={styles.headerPais}>
                    <h5>Por Países: </h5>
                </div>
            </div>
            <div className={styles.filtros}>
                <div className={styles.actividades}>                        
                    <div className={styles.contTitulos}>
                        <h3 id='actvName' className={styles.titulos} >Nombres
                            <div className={styles.opciones}>
                                {
                                    actName?.map( e => {
                                        return (
                                            <div key={e.name}>
                                                <input type='checkbox' name={e.name} id={Object.keys(e)[0]} onClick={handleActvName}/>
                                                <span>{e.name}</span>
                                                <br></br>
                                            </div>
                                        )
                                    })
                                }
                            </div> 
                        </h3>
                    </div>
                    <div className={styles.contTitulos}>
                        <h3 id='actvDiff' className={styles.titulos} >Dificultad
                            <div className={styles.opciones}>
                                <input type='checkbox' className={styles.check} name='1' onClick={handleActvDiff} ></input> <span>1</span> <br></br>
                                <input type='checkbox' name='2' onClick={handleActvDiff} ></input> <span>2</span> <br></br>
                                <input type='checkbox' name='3' onClick={handleActvDiff} ></input> <span>3</span> <br></br>
                                <input type='checkbox' name='4' onClick={handleActvDiff} ></input> <span>4</span> <br></br>
                                <input type='checkbox' name='5' onClick={handleActvDiff} ></input> <span>5</span> <br></br>
                            </div> 
                        </h3>
                    </div>
                    <div className={styles.contTitulos}>
                        <h3 id='actvDur' className={styles.titulos} >Duración
                            <div className={styles.opciones}>
                                {
                                    actDur?.map( e => {
                                        return (
                                            <div key={e.duration}>
                                                <input type='checkbox' name={e.duration} id={Object.keys(e)[0]} onClick={handleActvDur} />
                                                <span>{e.duration} {e.duration>1?'horas':'hora'}</span>
                                                <br></br>
                                            </div>
                                        )
                                    })
                                }
                            </div> 
                        </h3>
                    </div>
                    <div className={styles.contTitulos}>
                        <h3 id='actvTemp' className={styles.titulos} >Temporada
                            <div className={styles.opciones}>
                                <input type='checkbox' name='Invierno' onClick={handleActvSeas} ></input> <span>Invierno</span> <br></br>
                                <input type='checkbox' name='Primavera' onClick={handleActvSeas} ></input> <span>Primavera</span> <br></br>
                                <input type='checkbox' name='Verano' onClick={handleActvSeas} ></input> <span>Verano</span> <br></br>
                                <input type='checkbox' name='Otoño' onClick={handleActvSeas} ></input> <span>Otoño</span> <br></br>
                            </div> 
                        </h3>
                    </div>
                </div>
                <div className={styles.separador}></div>
                <div className={styles.paises}>
                    <div className={styles.contTitulos}>
                        <h3 id='Continent' className={styles.titulos}>Continentes
                            <div className={styles.opciones}>
                                <input type='checkbox' name='Africa' onClick={handleContinent} ></input> <span>África</span> <br></br>
                                <input type='checkbox' name='Asia' onClick={handleContinent} ></input> <span>Asia</span> <br></br>
                                <input type='checkbox' name='South America' onClick={handleContinent} ></input> <span>América del Sur</span> <br></br>
                                <input type='checkbox' name='North America' onClick={handleContinent} ></input> <span>América del Norte</span> <br></br>
                                <input type='checkbox' name='Europe' onClick={handleContinent} ></input> <span>Europa</span> <br></br>
                                <input type='checkbox' name='Oceania' onClick={handleContinent} ></input> <span>Oceanía</span> <br></br>
                            </div> 
                        </h3>
                    </div>
                </div>
                <div className={styles.ordenadores}>
                    <button id='alphOrd' className={styles.btnorder} onClick={handleAlph}>A - Z</button>
                    <button id='poblOrd' className={styles.btnorder} onClick={handlePobl}>Pobl: asc</button>
                </div>
                <div className={styles.buscar}>
                    <input className={styles.searchBox} onChange={handleCountryName} placeholder='Buscar...'></input>
                    <button className={styles.searchBtn} onClick={buscar}> Buscar </button>
                </div>
            </div>
        </div>
    );
}

export default Buscador;