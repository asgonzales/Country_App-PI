import styles from './PageNotFound.module.css';
import { Link } from 'react-router-dom';
import notfoundimg from '../../imgs/notFound.png';


function PageNotFound () {
    return (
        <div className={styles.pageNotFound}>
            <div>
                <h1 className={styles.titulo}>Error</h1>
                <img className={styles.imagen} alt='notfoundimg' src={notfoundimg}></img>
                <h3 className={styles.notFound}>Página no encontrada</h3>
            </div>
            <div>
                <Link to='/home' className={styles.home}>Ir a Home</Link>
            </div>
        </div>
    )
}


export default PageNotFound;