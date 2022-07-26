import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCountriesFilter } from '../../redux/actions/countries/index.js';
import MiniCard from '../MiniCard/MiniCard.jsx';
import Buscador from '../Buscador/Buscador.jsx';


function Home () {
    const effect = useEffect
    const dispatch = useDispatch()

    const datosEnBase = useSelector(state => state.datosEnBase)
    const countries = useSelector(state => state.countries)    //Guardo los países del reducer en una variable local
    //creo variables para el paginado
    const cardsFirstPage = 8 //Cantidad de cartas en la primer página. Uno menor que la cantidad deseada
    const cardsxPage = 10 //Cantidad de cartas por página
    const [min, setMin] = useState(0) //Determina el índice de countries por el que va a empezar el .map
    const [max, setMax] = useState(cardsFirstPage) //Determina el índice de countries hasta el cual va a llegar el .map. Uno menor que la cantidad deseada
    const [page, setPage] = useState(1) //Página actual
    let cantPages = []
    
    effect(() => {
        dispatch(getCountriesFilter()) //Llama a los países
    }, [dispatch])
    
    for(let i = 0; i < ((countries.length+1)/10); i++) { //Determina la cantidad de páginas
        cantPages.push(i + 1)         
    }
    
    effect(()=> { //Resetea los valores de paginado si la cantidad de países en countries cambia
        setMin(0)
        setMax(cardsFirstPage)
        setPage(1)

        //
        if(countries.length < 1) document.querySelector('#cartelPaises').className = styles.cartelPaisesNoOculto
        else document.querySelector('#cartelPaises').className = styles.cartelPaisesOculto
        if(!datosEnBase) {
            document.querySelector('#cartelPaises').innerText = 'Cargando países desde la API...'
            document.querySelector('#cartelPaises').className = styles.cartelPaisesNoOculto
        }
        else document.querySelector('#cartelPaises').innerText = 'No se encontraron países.'
        
    },[countries.length, countries])

    effect( () => { //effect de botones de paginado
        if (page === 1) {
            document.querySelector('#pagAnt').className = styles.disabled
        }
        else document.querySelector('#pagAnt').className = styles.btn
        if (page > countries.length/10) {
            document.querySelector('#pagSig').className = styles.disabled
        }
        else document.querySelector('#pagSig').className = styles.btn
        
    }, [page, countries.length])

    const paginaAnterior = () => {
        if (page > 2) { //Si la página es mayor a 2 reduce min y max en cardsxPage cantidades y resta 1 a la página
            setMin(min - cardsxPage)
            setMax(max - cardsxPage)
        }
        if (page === 2) { //Si la página es 2, setea el min y max a los valores iniciales
            setMin(0)
            setMax(cardsFirstPage)
        }
        if (page > 1) {
            setPage(page -1) //Evita que page llegue a valores menores a 1
        } 
    }

    const paginaSiguiente = () => {
        if (page === 1 && max < countries.length - 1) { // Si la pagina es la primera entonces setea el valor de min en max + 1 (9) y el de max en cardsxPage cantidades. Aumenta page en 1
            setMin(max + 1)
            setMax(max + cardsxPage)
            setPage(page + 1)
        }
        else if (max < countries.length - 1) { //Evita que page llegue a un valor más alto del necesario.
            setMin(min + cardsxPage)
            setMax(max + cardsxPage)
            setPage(Number(page) + 1)
        }
    }
    const irAPagina = (e) => {
        // console.log('Pagina: ', page)
        // console.log('Min: ', min)
        // console.log('Max: ', max)
        // console.log('nombre', e.target.name)
        // console.log(cantPages)
        if(Number(e.target.name) === 1) {
            setMin(0)
            setMax(cardsFirstPage)
            setPage(1)
        } else {
            console.log('OTRO', page)
            setMin(((e.target.name - 1) * cardsxPage) - 1)
            setMax(((e.target.name - 1) * cardsxPage) + cardsFirstPage)
            setPage(e.target.name)
        }
    }
    return (
        <div className={styles.Home}>
            <Buscador></Buscador>
            <h4 id='cartelPaises' className={styles.cartelPaises}>No se encontraron países.</h4>
            {
                countries?.map( (e, y) => {
                    if (y >= min && y <= max) return <MiniCard 
                    key={e.id} id={e.id} name={e.name} img={e.flag} continent={e.continent} pobl={e.population} 
                    />
                    return null
                })
            }
            <div>
                <button id='pagAnt' className={styles.btn} onClick={paginaAnterior}>anterior</button>
                {
                    cantPages?.map( e => {
                        return (
                            <button key={e} name={e} className={styles.btnPag} onClick={irAPagina}>{e}</button>

                        )
                    })
                }
                <button id='pagSig' className={styles.btn} onClick={paginaSiguiente}>siguiente</button>
            </div>
        </div>
    );
}

export default Home;