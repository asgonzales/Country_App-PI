import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';


function Navbar () {



    return (
        <div className={styles.Navbar}>
            {/* SOY EL NAVBAR */}
            <div className={styles.enlaces}>
                <NavLink to='/home' className={styles.link}  >Country App</NavLink>
                <NavLink to='/Home' className={styles.link} activeClassName={styles.linkActive}  >Home</NavLink>
                <NavLink to='/Cat' className={styles.link} activeClassName={styles.linkActive}  >CAT</NavLink>
                <NavLink to='/About' className={styles.link} activeClassName={styles.linkActive} >About</NavLink>
            </div>
        </div>
    );
}

export default Navbar;