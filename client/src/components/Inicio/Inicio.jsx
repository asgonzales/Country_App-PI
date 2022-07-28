import styles from './Inicio.module.css';
import { Link } from 'react-router-dom';
import turismo from '../../imgs/turismo2.jpg';


function Inicio () {



    return (
        <div className={styles.Inicio}>
            <div className={styles.izquierda}>
                <img src={turismo} alt='img1' className={styles.imginicio}></img>
            </div>
            <div className={styles.derecha}>
                <h1 className={styles.titulo}>Country App</h1>
                <ul>
                    <li><p className={styles.texto}>Encuentra las mejores actividades turísticas de cada país.</p></li>
                    <li><p className={styles.texto}>Búsqueda por continente o por actividad turística.</p></li>
                    <li><p className={styles.texto}>Agrega nuevas actividades a distintos países.</p></li>
                </ul>                
                <Link to = '/Home' className={styles.ingresar}>Ingresar</Link>
            </div>

        </div>
    );
}

export default Inicio;