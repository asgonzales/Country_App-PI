import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCountries } from '../../redux/actions/index.js';
import MiniCard from '../MiniCard/MiniCard.jsx'


function Home () {
    const effect = useEffect
    const dispatch = useDispatch()

    effect(() => {
        console.log('pepe')
        dispatch(getAllCountries())
    }, [dispatch])

    const countries = useSelector(state => state.countries)

    function boton() {
        console.log('boton', countries)
    }
    return (
        <div className={styles.Home}>
            SOY EL HOME
            <button onClick={boton}>Acá aparecen las mini cartas</button>
            <p>PRUEBA</p>
            {
                countries?.map(e => {
                    return <MiniCard key={e.id} name={e.name} img={e.flag} continent={e.continent} />
                })
            }
        </div>
    );
}

export default Home;