import styles from './Inicio.module.css';
import { NavLink } from 'react-router-dom';



function Inicio () {



    return (
        <div className={styles.Inicio}>
            SOY EL INICIO
            <NavLink to = '/Home'>
                <button> Ingresar </button>
            </NavLink>
            <p>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
        </div>
    );
}

export default Inicio;