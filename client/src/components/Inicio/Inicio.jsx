import styles from './Inicio.module.css';
import { Link } from 'react-router-dom';
import pareja2 from '../../imgs/TurismoPareja2.png';
import pareja1 from '../../imgs/TurismoPareja1.png';
import TresPersonas1 from '../../imgs/TurismoTresPersonas3.png';
import turismoGuia from '../../imgs/TurismoGuia.png';


function Inicio () {



    return (
        <div className={styles.contInicio}>
            <div className={styles.bloque}>
                <div className={styles.izquierda}>
                    <img src={pareja2} alt='img1' className={styles.imginicio}></img>
                </div>
                <div className={styles.derecha}>
                    <h1 className={styles.titulo}>Country App</h1>
                    <p>Encuentra las mejores actividades en más de 200 países. Ideal para planificar las mejores vacaciones.</p>
                    <Link to = '/Home' className={styles.ingresar}>Ingresar</Link>
                </div>
            </div>
            <div className={styles.bloque}>
                <div className={styles.izquierda}>
                    <p>Encuentra las mejores actividades turísticas de cada país.</p>
                </div>
                <div className={styles.derecha}>
                    <img src={pareja1} alt='img1' className={styles.imginicio}></img>
                </div>
            </div>
            <div className={styles.bloque}>
                <div className={styles.izquierda}>
                    <img src={TresPersonas1} alt='img1' className={styles.imginicio}></img>
                </div>
                <div className={styles.derecha}>
                    <p>Búsqueda por continente o por actividad turística.</p>
                </div>
            </div>
            <div className={styles.bloque}>
                <div className={styles.izquierda}>
                    <p>Agrega nuevas actividades a distintos países.</p>
                </div>
                <div className={styles.derecha}>
                    <img src={turismoGuia} alt='img1' className={styles.imginicio}></img>
                </div>
            </div>
        </div>
    );
}

export default Inicio;