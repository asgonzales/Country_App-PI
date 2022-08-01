import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCountries } from '../../redux/actions/countries/index.js';
import MiniCard from '../MiniCard/MiniCard.jsx';
import Buscador from '../Buscador/Buscador.jsx';


function Home () {
    const effect = useEffect
    const dispatch = useDispatch()

    //creo variables para el paginado
    const cardsFirstPage = 8 //Cantidad de cartas en la primer página. Uno menor que la cantidad deseada
    const cardsxPage = 10 //Cantidad de cartas por página
    const [min, setMin] = useState(0) //Determina el índice de countries por el que va a empezar el .map
    const [max, setMax] = useState(cardsFirstPage) //Determina el índice de countries hasta el cual va a llegar el .map. Uno menor que la cantidad deseada
    const [page, setPage] = useState(1) //Página actual
    
    effect(() => {
        dispatch(getAllCountries()) //Llama a los países
    }, [dispatch])

    const countries = useSelector(state => state.countries)    //Guardo los países del reducer en una variable local

    effect(()=> { //Resetea los valores de paginado si la cantidad de países en countries cambia
        // console.log('reseteo de valores')
        setMin(0)
        setMax(cardsFirstPage)
        setPage(1)
    },[countries.length])
    // const boton = () => {
    //     console.log(countries) //Botón de pruebas
    // }

    const paginaAnterior = () => {
        if (page > 2) { //Si la página es mayor a 2 reduce min y max en cardsxPage cantidades y resta 1 a la página
            // setPage(page - 1)
            setMin(min - cardsxPage)
            setMax(max - cardsxPage)
        }
        if (page === 2) { //Si la página es 2, setea el min y max a los valores iniciales
            setMin(0)
            setMax(cardsFirstPage)
        }
        if (page > 1) setPage(page -1) //Evita que page llegue a valores menores a 1
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
            setPage(page + 1)
        }
    }
    return (
        <div className={styles.Home}>
            <Buscador></Buscador>
            {/* <button onClick={boton}>Acá aparecen las mini cartas</button> */}
            {
                countries?.map( (e, y) => {
                    if (y >= min && y <= max) return <MiniCard 
                    key={e.id} id={e.id} name={e.name} img={e.flag} continent={e.continent} pobl={e.population} 
                    />
                    return null
                })
            }
            <div>
                <button className={styles.btn} onClick={paginaAnterior}>anterior</button>
                <button className={styles.btn} onClick={paginaSiguiente}>siguiente</button>
            </div>
        </div>
    );
}

export default Home;