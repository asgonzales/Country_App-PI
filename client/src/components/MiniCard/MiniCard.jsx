import styles from './MiniCard.module.css';




function MiniCard (props) {



    return (
        <div>
            <p>_________________________________</p>
            <img className={styles.flag} src={props.img} alt={props.name}/>
            <p>{props.name}</p>
            <p>{props.continent}</p>
            <p>_________________________________</p>
        </div>
    );
}

export default MiniCard;