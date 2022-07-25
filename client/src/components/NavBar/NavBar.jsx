import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';


function Navbar () {



    return (
        <div className={styles.Navbar}>
            SOY EL NAVBAR
            <div className={styles.enlaces}>
                <NavLink to='/Home'> Ir a Home </NavLink>
                {/* <NavLink to='/Detalles'> Ir a Detalles </NavLink> */}
                <NavLink to='/Cat'> Ir a CAT </NavLink>
                <NavLink to='/About'> Ir a About </NavLink>
            </div>
        </div>
    );
}

export default Navbar;