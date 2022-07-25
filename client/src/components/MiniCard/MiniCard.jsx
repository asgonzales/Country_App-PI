import styles from './MiniCard.module.css';
import { NavLink } from 'react-router-dom';



function MiniCard (props) {


    return (
        <div>
            {/* <p>_________________________________</p> */}
            <img className={styles.flag} src={props.img} alt={props.name}/>
            <p>{props.name}</p>
            <p>{props.continent}</p>
            <NavLink to={`/detalles/${props.id}`}>
            <button>Ver más...</button>
            </NavLink>
            {/* <p>_________________________________</p> */}
        </div>
    );
}

export default MiniCard;