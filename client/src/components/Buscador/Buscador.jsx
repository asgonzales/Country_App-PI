import styles from './Buscador.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesFilter, getContinents } from '../../redux/actions/countries';
import { getFilters } from '../../redux/actions/activities';
import { useEffect, useState } from 'react';
// import order from '../../imgs/sortby.png';

function Buscador () {
    const dispatch = useDispatch()
    const effect = useEffect;
    //Llamo a las variables de ordenamiento y continente
    // let alph = useSelector(state => state.alph)
    // let ppl = useSelector(state => state.ppl)
    // let continents = useSelector(state => state.continents) //Filtrado por continente
    // let continent = useSelector(state => state.continent)
    //Llamo a las variables de filtrado por actividad
    let actName = useSelector(state => state.actName) //Nombres traídos de la BD
    // let name = useSelector(state => state.name)
    // let actDiff = useSelector(state => state.actDiff)
    // let difficult = useSelector(state => state.difficult)
    let actDur = useSelector(state => state.actDur) //Duraciones traídas de la BD
    // let duration = useSelector(state => state.duration)
    // let actSeason = useSelector(state => state.actSeason)
    // let season = useSelector(state => state.season)

    //variables para la búsqueda de países.
    const [ name, setName ] = useState('')
    const [ alph, setAlph ] = useState('')
    const [ pobl, setPobl ] = useState('')
    const [ continent, setContinent ] = useState([])
    const [ actvName, setActvName ] = useState([])
    const [ actvDiff, setActvDiff ] = useState([])
    const [ actvDur, setActvDur ] = useState([])
    const [ actvSeas, setActvSeas ] =useState([])
    //Obtengo los valores del filtro por actividades y los continentes
    effect(() => {
        dispatch(getFilters('name'))
        // dispatch(getFilters('difficult'))
        dispatch(getFilters('duration'))
        // dispatch(getFilters('season'))
        // dispatch(getContinents())
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
    //Funcion handl de continent
    const handleContinent = (e) => {
        if(e.target.checked) setContinent([...continent, e.target.name])
        else continent.splice(continent.indexOf(e.target.name), 1)
        buscar()
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

    //Cada que hay cambios en las variables de búsqueda se realiza una nueva búsqueda
    effect(() => {
        buscar()
        // console.log(actvSeas)
    }, [name, alph, pobl, continent, actvName, actvDiff, actvDur, actvSeas])

    const buscar = () => {
        // let nombre = document.querySelector('#txtBuscar')
        // console.log(actvDiff)
        // dispatch(getCountriesFilter(nombre.value, alph, ppl, continent, name, difficult, duration, season))
        dispatch(getCountriesFilter(name, alph, pobl, continent, actvName, actvDiff, actvDur, actvSeas))
        // console.log(alph)
        // console.log(duration)
    }

    // const cambiarOrdenAlph = () => {
    //     console.log('precambiarorden: ', alph)
    //     ppl = ''
    //     // if (alph === '') {
    //     //     alph = 'asc'
    //     // }
    //     alph = alph==='asc'?'desc':'asc'
    //     console.log('cambiar orden: ', alph)
    //     buscar()
    // }
    // const cambiarOrdenPpl = () => {
    //     console.log('click')
    //     // alph = ''
    //     // if (ppl === '') {
    //     //     ppl = 'asc'
    //     // }
    //     ppl = ppl==='asc'?'desc':'asc'
    //     console.log('alph:', alph, 'ppl:', ppl)
    //     // buscar()
    // }
    // const cambiarContinent = (e) => {
    //     if (e.target.checked) continent.push(e.target.name)
    //     else continent.splice(continent.indexOf(e.target.name), 1)
    //     buscar()
    //     console.log(continent)
    // }
    //Cambiar variables de filtrado de actividades
    // const cambiarActNombre = (e) => {
    //     if (e.target.checked) name.push(e.target.name)
    //     else name.splice(name.indexOf(e.target.name), 1)
    //     buscar()
    // }
    // const cambiarActDiff = (e) => {
    //     if (e.target.checked) difficult.push(e.target.name)
    //     else difficult.splice(difficult.indexOf(e.target.name), 1)
    //     buscar()
    // }
    // const cambiarActDur = (e) => {
    //     if (e.target.checked) duration.push(e.target.name)
    //     else duration.splice(duration.indexOf(e.target.name))
    //     buscar()
    // }
    // const cambiarActSeason = (e) => {
    //     if (e.target.checked) season.push(e.target.name)
    //     else season.splice(season.indexOf(e.target.name), 1)
    //     buscar()
    // }


    return (
        <div className={styles.Buscador}>
            <div className={styles.Principal}>
                <div className={styles.continentes}>
                    <h3>Continentes</h3>
                     <div className={styles.opciones}>
                        {/* {
                            continents?.map( e => {
                                return (
                                    <div key={e.continent}>
                                        <input type='checkbox' name={e.continent} onClick={cambiarContinent}></input>
                                        <span>{e.continent}</span>
                                        <br></br>
                                    </div>
                                    )
                            })
                        } */}
                        <input type='checkbox' name='Africa' onClick={handleContinent} ></input> <span>África</span> <br></br>
                        <input type='checkbox' name='Asia' onClick={handleContinent} ></input> <span>Asia</span> <br></br>
                        <input type='checkbox' name='South America' onClick={handleContinent} ></input> <span>América del Sur</span> <br></br>
                        <input type='checkbox' name='North America' onClick={handleContinent} ></input> <span>América del Norte</span> <br></br>
                        <input type='checkbox' name='Europe' onClick={handleContinent} ></input> <span>Europa</span> <br></br>
                        <input type='checkbox' name='Oceania' onClick={handleContinent} ></input> <span>Oceanía</span> <br></br>
                    </div> 
                </div>
                <div className={styles.actividades}>                        
                    <div className={styles.nombres}>                                    {/* ACTIVIDADES */}
                        <h3>Nombres</h3>
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
                    </div>
                    <div className={styles.dificultades}>
                        <h3>Dificultad</h3>
                        <div className={styles.opciones}>
                            {/* {
                                actDiff?.map( e => {
                                    return (
                                        <div key={e.difficult}>
                                            <input type='checkbox' name={e.difficult} id={Object.keys(e)[0]} onClick={cambiarActDiff}/>
                                            <span>{e.difficult}</span>
                                            <br></br>
                                        </div>
                                    )
                                })
                            } */}
                            <input type='checkbox' name='1' onClick={handleActvDiff} ></input> <span>1</span> <br></br>
                            <input type='checkbox' name='2' onClick={handleActvDiff} ></input> <span>2</span> <br></br>
                            <input type='checkbox' name='3' onClick={handleActvDiff} ></input> <span>3</span> <br></br>
                            <input type='checkbox' name='4' onClick={handleActvDiff} ></input> <span>4</span> <br></br>
                            <input type='checkbox' name='5' onClick={handleActvDiff} ></input> <span>5</span> <br></br>
                        </div> 
                    </div>
                    <div className={styles.duraciones}>
                        <h3>Duración</h3>
                            <div className={styles.opciones}>
                            {
                                actDur?.map( e => {
                                    return (
                                        <div key={e.duration}>
                                            <input type='checkbox' name={e.duration} id={Object.keys(e)[0]} onClick={handleActvDur} />
                                            <span>{e.duration}</span>
                                            <br></br>
                                        </div>
                                    )
                                })
                            }
                        </div> 
                    </div>
                    <div className={styles.temporadas}>
                        <h3>Temporada</h3>
                            <div className={styles.opciones}>
                            {/* {                             
                                actSeason?.map( e => {
                                    return (
                                        <div key={e.season} >
                                            <input type='checkbox' name={e.season} id={Object.keys(e)[0]} onClick={cambiarActSeason} />
                                            <span>{e.season}</span>
                                            <br></br>
                                        </div>
                                    )
                                })
                            } */}
                            <input type='checkbox' name='Winter' onClick={handleActvSeas} ></input> <span>Invierno</span> <br></br>
                            <input type='checkbox' name='Spring' onClick={handleActvSeas} ></input> <span>Primavera</span> <br></br>
                            <input type='checkbox' name='Summer' onClick={handleActvSeas} ></input> <span>Verano</span> <br></br>
                            <input type='checkbox' name='Autumn' onClick={handleActvSeas} ></input> <span>Otoño</span> <br></br>
                        </div> 
                    </div>
                </div>
                <div className={styles.ordenadores}>
                    <button className={styles.btnorder} onClick={handleAlph}>
                        A - Z
                    </button>
                    <button className={styles.btnorder} onClick={handlePobl}>
                        Pobl: asc
                    </button>
                </div>
                <div className={styles.buscar}>
                    <input id='txtBuscar' onChange={handleCountryName}></input>
                    <button onClick={buscar}> Buscar </button>
                </div>
            </div>
        </div>
    );
}

export default Buscador;