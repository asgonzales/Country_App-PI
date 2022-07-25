import styles from './Detalles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountryDetail } from '../../redux/actions/countries/index.js';
import { useEffect } from 'react';


function Detalles () {
    const dispatch = useDispatch()
    const effect = useEffect;
    const { id } = useParams();
    
    effect( () => {
        dispatch(getCountryDetail(id))
    },[dispatch])
    const detalles = useSelector( state => state.country )
    // console.log(detalles)

    return (
        <div className={styles.Detalles}>
            SOY EL DETALLES
            <p>Nombre: {detalles.name}</p>
            <img src={detalles.flag} alt='bandera' ></img>
            <p>Continente: {detalles.continent}</p>
            <p>ID: {detalles.id}</p>
            <p>Capital: {detalles.capital}</p>
            <p>Subregion: {detalles.subregion}</p>
            <p>Area: {detalles.area} km2</p>
            <p>Población: {detalles.population}</p>
            <h6>Actividades turísticas: </h6>
            {/* {
                detalles.Tourist_Activities?<div>
                    <button>orden nombre</button>
                    <button>orden dificultad</button>
                    <button>orden duración</button>
                    <button>orden estación</button>
                </div>:<></>
            } */}
            {
                detalles.Tourist_Activities?.map( e => {
                    return (
                    <div key={e.id}>
                        <span>nombre: {e.name} </span>
                        <span>dificultad: {e.difficult} </span>
                        <span>duración: {e.duration} </span>
                        <span>estación: {e.season} </span>
                    </div>
                    )
                })
            }
        </div>
    );
}

export default Detalles;