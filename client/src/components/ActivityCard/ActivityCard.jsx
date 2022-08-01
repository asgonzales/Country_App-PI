import styles from './ActivityCard.module.css';





function ActivityCard(props) {

    return (
        <div className={styles.ActivityCard}>
            <div className={styles.titulo} >
                <h1> {props.name} </h1>
            </div>
            <div className={styles.detalles}>
                <h2>Dificultad: {props.difficult} </h2>
                <h2>Duración: {props.duration} {props.duration>1?'horas':'hora'} </h2>
                <h2>Temporada: {props.season} </h2>
            </div>
        </div>
    )
}



export default ActivityCard;