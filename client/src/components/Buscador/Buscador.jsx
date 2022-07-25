import styles from './Buscador.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCountriesFilter, getContinents } from '../../redux/actions/countries';
import { getFilters } from '../../redux/actions/activities';
import { useEffect } from 'react';

function Buscador () {
    const dispatch = useDispatch()
    const effect = useEffect;
    //Llamo a las variables de ordenamiento y continente
    let alph = useSelector(state => state.alph)
    let ppl = useSelector(state => state.ppl)
    let continents = useSelector(state => state.continents)
    let continent = useSelector(state => state.continent)
    //Llamo a las variables de filtrado por actividad
    let actName = useSelector(state => state.actName)
    let name = useSelector(state => state.name)
    let actDiff = useSelector(state => state.actDiff)
    let difficult = useSelector(state => state.difficult)
    let actDur = useSelector(state => state.actDur)
    let duration = useSelector(state => state.duration)
    let actSeason = useSelector(state => state.actSeason)
    let season = useSelector(state => state.season)

    //Obtengo los valores del filtro por actividades y los continentes
    effect(() => {
        dispatch(getFilters('name'))
        dispatch(getFilters('difficult'))
        dispatch(getFilters('duration'))
        dispatch(getFilters('season'))
        dispatch(getContinents())
        // console.log(actDiff)
    }, [dispatch])

    const buscar = () => {
        let nombre = document.querySelector('#txtBuscar')
        dispatch(getCountriesFilter(nombre.value, alph, ppl, continent, name, difficult, duration, season))
        // console.log(duration)
    }

    const cambiarOrdenAlph = () => {
        ppl = ''
        if (alph === '') {
            alph = 'asc'
        }
        alph==='asc'?alph='desc':alph='asc'
        buscar()
    }
    const cambiarOrdenPpl = () => {
        alph = ''
        if (ppl === '') {
            ppl = 'asc'
        }
        ppl==='asc'?ppl='desc':ppl='asc'
        buscar()
    }
    const cambiarContinent = (e) => {
        if (e.target.checked) continent.push(e.target.name)
        else continent.splice(continent.indexOf(e.target.name), 1)
        buscar()
        console.log(continent)
    }
    //Cambiar variables de filtrado de actividades
    const cambiarActNombre = (e) => {
        if (e.target.checked) name.push(e.target.name)
        else name.splice(name.indexOf(e.target.name), 1)
        buscar()
    }
    const cambiarActDiff = (e) => {
        if (e.target.checked) difficult.push(e.target.name)
        else difficult.splice(difficult.indexOf(e.target.name), 1)
        buscar()
    }
    const cambiarActDur = (e) => {
        if (e.target.checked) duration.push(e.target.name)
        else duration.splice(duration.indexOf(e.target.name))
        buscar()
    }
    const cambiarActSeason = (e) => {
        if (e.target.checked) season.push(e.target.name)
        else season.splice(season.indexOf(e.target.name), 1)
        buscar()
    }


    return (
        <div className={styles.Buscador}>
            SOY EL Buscador
            <div className={styles.continente || 'continent'}>
                {
                    continents?.map( e => {
                        return (
                            <div key={e.continent}>
                                <input type='checkbox' name={e.continent} onClick={cambiarContinent}></input>
                                <span>{e.continent}</span>
                                <br></br>
                            </div>
                            )
                    })
                }
                {/* <input type='checkbox' name='Europe' className='chk1' onClick={cambiarContinent}></input>
                <span>Europa</span>
                <br></br>
                <input type='checkbox' name='South America' onClick={cambiarContinent}></input>
                <span>America del sur</span>
                <br></br>
                <input type='checkbox' name='Asia' onClick={cambiarContinent}></input>
                <span>Asia</span> */}
            </div>
            <div className={styles.orden}>
                <button onClick={cambiarOrdenAlph}>
                    <span>Alfabeitcamente</span>
                    <img alt='asd'></img>
                </button>
                <button onClick={cambiarOrdenPpl}>
                    <span>Pobalcion</span>
                    <img alt='asd'></img>
                </button>
            </div>
            <div className={styles.actividad}>

            </div>
            <div className={styles.activities || 'activities'}>
                <div>
                <h1>Nombres de Actividades</h1>
                {
                    actName?.map( e => {
                        return (
                            <div key={e.name}>
                                <input type='checkbox' name={e.name} id={Object.keys(e)[0]} onClick={cambiarActNombre}/>
                                <span>{e.name}</span>
                                <br></br>
                            </div>
                        )
                    })
                }
                </div>
                <div>
                <h1>Dificultad de Actividades</h1>
                {
                    actDiff?.map( e => {
                        return (
                            <div key={e.difficult}>
                                <input type='checkbox' name={e.difficult} id={Object.keys(e)[0]} onClick={cambiarActDiff}/>
                                <span>{e.difficult}</span>
                                <br></br>
                            </div>
                        )
                    })
                }
                </div>
                <div>
                <h1>Duracion de Actividades</h1>
                {
                    actDur?.map( e => {
                        return (
                            <div key={e.duration}>
                                <input type='checkbox' name={e.duration} id={Object.keys(e)[0]} onClick={cambiarActDur} />
                                <span>{e.duration}</span>
                                <br></br>
                            </div>
                        )
                    })
                }
                </div>
                <div>
                <h1>temporada de Actividades</h1>
                {
                    actSeason?.map( e => {
                        return (
                            <div key={e.season} >
                                <input type='checkbox' name={e.season} id={Object.keys(e)[0]} onClick={cambiarActSeason} />
                                <span>{e.season}</span>
                                <br></br>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div>
                <input id='txtBuscar'></input>
                <button onClick={buscar}> Buscar </button>
            </div>
        </div>
    );
}

export default Buscador;