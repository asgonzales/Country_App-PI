import styles from './Buscador.module.css';



function Buscador () {



    return (
        <div className={styles.Buscador}>
            SOY EL Buscador
            <div className={styles.continente}>
                <input type='checkbox'></input>
                <span>Europa</span>
                <br></br>
                <input type='checkbox'></input>
                <span>America del sur</span>
                <br></br>
                <input type='checkbox'></input>
                <span>Asia</span>
            </div>
            <div className={styles.orden}>
                <button>
                    <span>Alfabeitcamente</span>
                    <img alt='asd'></img>
                </button>
                <button>
                    <span>Pobalcion</span>
                    <img alt='asd'></img>
                </button>
            </div>
            <div className={styles.actividad}>

            </div>
            <div>
                <input></input>
                <button> Buscar </button>
            </div>
        </div>
    );
}

export default Buscador;