import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';


function Navbar () {



    return (
        <div className={styles.Navbar}>
            {/* SOY EL NAVBAR */}
            <div className={styles.enlaces}>
                <NavLink to='/home' className={styles.fakeLink}  >Country App</NavLink>
                <NavLink to='/Home' className={styles.link} activeClassName={styles.linkActive}  >Inicio</NavLink>
                <NavLink to='/Cat' className={styles.link} activeClassName={styles.linkActive}  >Crear Actividad Turística</NavLink>
                <NavLink to='/About' className={styles.link} activeClassName={styles.linkActive} >Acerca de</NavLink>
            </div>
        </div>
    );
}

export default Navbar;