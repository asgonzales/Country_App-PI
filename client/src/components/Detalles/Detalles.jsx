import styles from './Detalles.module.css';
import ActivityCard from '../ActivityCard/ActivityCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountryDetail } from '../../redux/actions/countries/index.js';
import { useEffect } from 'react';
import PageNotFound from '../PageNotFound/PageNotFound';


function Detalles () {
    const dispatch = useDispatch()
    const effect = useEffect;
    const { id } = useParams();
    let detalles = useSelector( state => state.country )
    
    
    effect( () => { //Effect que llama al pais 
        detalles = {}
        window.scrollTo(0,0)
        dispatch(getCountryDetail(id))
    },[dispatch])

    effect( () => { //Effect de actividades turisticas del pais
        if(detalles) {
            if(!detalles.Tourist_Activities || detalles.Tourist_Activities?.length < 1) document.querySelector('#actividades').innerText = 'No se encontraron actividades para este país';
            else document.querySelector('#actividades').innerText = 'Actividades turísticas:';
        }
    }, [detalles])

    return (
        <div>
            {
                detalles?
                <>
                    <div className={styles.Detalles}>
                        <div className={styles.bandera}>
                            <img className={styles.banderaDetalles} src={detalles.flag} alt='bandera' ></img>
                        </div>
                        <div className={styles.informacion}>
                            <div className={styles.titulo}>
                                <h1 className={styles.nombre}>{detalles.name}</h1>
                            </div>
                            <div className={styles.detalles}>
                                <div className={styles.detallesIzquierda}>
                                    <p>
                                        <span className={styles.subtitulo} >Continente: </span> <span className={styles.subText} >{detalles.continent}</span>
                                    </p>
                                    <p>
                                        <span className={styles.subtitulo} >Subregion: </span> <span className={styles.subText} >{detalles.subregion}</span>
                                    </p>
                                    <p>
                                        <span className={styles.subtitulo} >Capital: </span> <span className={styles.subText} >{detalles.capital}</span>
                                    </p>
                                    <br></br>
                                </div>
                                <div className={styles.detallesDerecha}>
                                    <p>
                                        <span className={styles.subtitulo} >Area: </span> <span className={styles.subText} >{Number(detalles.area).toLocaleString()} km2</span>
                                    </p>
                                    <p>
                                        <span className={styles.subtitulo} >Población: </span> <span className={styles.subText} >{Number(detalles.population).toLocaleString()}</span>
                                    </p>
                                    <p>
                                        <span className={styles.subtitulo} >ID: </span> <span className={styles.subText} >{detalles.id}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.actividades}>
                            <div className={styles.titulo}>
                                <h2 id='actividades' className={styles.actvTitulo}>Actividades turísticas: </h2>
                            </div>
                            <br></br>
                            {
                                detalles.Tourist_Activities?.map( e => {
                                    return (
                                        <ActivityCard key={e.id} name={e.name} difficult={e.difficult} duration={e.duration} season={e.season}></ActivityCard>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
                :
                <PageNotFound />
            }
        </div>
        
    );
}

export default Detalles;