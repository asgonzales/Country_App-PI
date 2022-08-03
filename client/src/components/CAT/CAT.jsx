import styles from './CAT.module.css';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addActivity } from "../../redux/actions/activities/index.js";
import { getAllCountries } from '../../redux/actions/countries/index.js';
// import { act } from 'react-dom/test-utils';



function Cat () {
    const countries = useSelector( state => state.countries)
    const [searchCountries, setSearchCountries] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const dispatch = useDispatch()

    const effect = useEffect

    effect(() => {
        dispatch(getAllCountries())
    },[dispatch])

    const [activity, setActivity] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        countries: []
    })
    const [errores, setErrores] = useState({
        name: 'error',
        duration: 'error',
    })

    const handleInputChange = ( e ) => {
        // const boton = document.querySelector('#submit')
        // console.log(e.target.value)
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        })
    }
    const handleNameChange = (e) => {
        const cartel = document.querySelector('#cartelError')
        if(e.target.value === '') {
            e.target.className = styles.error
            e.target.placeholder = 'Ingrese un nombre para la actividad'
            setErrores({...errores, name: 'Error'})
        } else if(!/^[A-Za-z ]+$/.test(e.target.value)) {
            e.target.className = styles.error
            cartel.innerText = 'No se permiten números o carácteres especiales en el nombre de la actividad'
            cartel.className = styles.cartelError
            setErrores({...errores, name: 'Error'})
        } else{
            e.target.className = styles.inputBox
            cartel.className = ''
            setErrores({...errores, name: ''})
        }
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        })
    }
    const handleDurationChange = (e) => {
        const cartel = document.querySelector('#cartelError')
        if(e.target.value === '') {
            e.target.className = styles.error;
            e.target.color = 'red';
            setErrores({...errores, duration: 'Error'})
        } else if (e.target.value > 8) {
            e.target.className = styles.error;
            cartel.innerText = 'La duración no puede ser mayor a 8';
            cartel.className = styles.cartelError;
            setErrores({...errores, duration: 'Error'})
        } else {
            e.target.className = styles.inputBox;
            e.target.color = 'var(--sec)';
            cartel.className = '';
            setErrores({...errores, duration: ''})
        }
        setActivity({
            ...activity,
            [e.target.name]: e.target.value
        })
    }
    effect(() => {
        // console.log(!!activity.difficult, activity.difficult)
        // console.log(!!activity.season, activity.season)
        // console.log(!errores.duration, errores.duration)
        // console.log(!errores.name, errores.name)
        if(!errores.name && !!activity.difficult && !errores.duration && !!activity.season && activity.countries.length > 0) {
            // console.log('PASO')
            document.querySelector('#submit').className = styles.btn
            document.querySelector('#boton').disabled = false
        } else {
            document.querySelector('#submit').className = styles.btnError
            document.querySelector('#boton').disabled = true
        }
    }, [activity])
        // console.log(activity)
    const handleInputSearch = ( e ) => {
        setSearchCountries(countries.filter(item => item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
    }
    const handleSelected = (event, country ) => {
        if(event.target.checked) {
            setSelectedCountries([...selectedCountries, country])
            setActivity({
                ...activity,
                countries:[...activity.countries,country.id]
            })
        }
        // else selectedCountries.splice(selectedCountries.indexOf(country.id), 1)
    }
    const deleteSelected = (event, country) => {
        // console.log(country)
        if (!event.target.checked) {
            setSelectedCountries(selectedCountries.filter(e => e.id !== country))
            setActivity({
                ...activity,
                countries: activity.countries.filter(e => e !== country)
            })
        } 
    }
    const submitea2 = (e) => {
        e.preventDefault()
        console.log(selectedCountries, activity)
        dispatch( addActivity(activity))
        .then( err => {
            document.querySelector('#cartelError').innerText = 'Actividad creada'
            document.querySelector('#cartelError').className = styles.agregado
        })
        // console.log(post)
        // document.querySelector('#cartelError').innerText = post
    }

    return (
        <div className={styles.catPrincipal} >
            <div className={styles.titulo}>
                <h1> Formulario de Creación de Actividades Turísticas</h1>
            </div>
            <form onSubmit={submitea2} className={styles.form}>
                <div className={styles.nombre} >
                    <label>Nombre: </label>
                    <input name='name' type='text'
                        className={styles.inputBox} 
                        placeholder={'Nombre de la actividad...'} 
                        onChange={handleNameChange}>
                    </input>
                    <br></br>
                    <br></br>
                </div>
                <div className={styles.dificultad} >
                    <label>Dificultad: </label>
                    <select name='difficult' className={styles.inputBox} onChange={handleInputChange}>
                        <option hidden>Seleccione una dificultad</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <br></br>
                </div>
                <div className={styles.duracion}>
                    <label>Duración: </label>
                    <input name='duration' type='number' min='1' max='8' onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                        className={styles.inputBox} 
                        placeholder={'Ingrese una duración'}
                        onChange={handleDurationChange}>
                    </input>
                    <br></br>
                </div>
                <div className={styles.temporada} >
                    <label>Temporada: </label>
                    <select name='season' className={styles.inputBox}  onChange={handleInputChange}>
                        <option hidden>Seleccione una estación</option>
                        <option  >Otoño</option>
                        <option  >Invierno</option>
                        <option  >Primavera</option>
                        <option  >Verano</option>
                    </select>
                    <br></br>
                </div>
                <div className={styles.paises} >
                    <label>Países: </label>
                    <input type='search' name='countries' className={styles.inputBox} placeholder='Seleccione países' onChange={handleInputSearch}></input>
                    <br></br>
                </div>
                <div className={styles.lista} >
                    {
                        searchCountries?.map( e => {
                            // console.log(selectedCountries.includes(e.id), e.name)
                            if(!selectedCountries.some( arr => arr.id === e.id)) {
                                return(
                                    <div key={e.id}>
                                        <input type='checkbox' onClick={event => handleSelected(event, {id: e.id, name: e.name})}></input>
                                        <span>{e.name}</span>
                                    </div>
                                )
                            }
                            else return null
                        })
                    }
                </div>
                <div className={styles.paisesSeleccionados} >
                    <h3>SELECCIONADOS:</h3>
                    <div className={styles.lista}>
                        {
                            selectedCountries?.map( e => {
                                return (
                                    <div key={e.id}>
                                        <input type='checkbox' defaultChecked onClick={(event) => deleteSelected(event, e.id)}></input>
                                        <span>{e.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div id='submit' className={styles.btnError}>
                    <h6 id='cartelError'>No se permiten números en el nombre de la actividad</h6>
                    {/* <h6 className={errors.durationE && styles.cartelError}>La duración máxima es 8</h6> */}
                    <button id='boton' type='submit'  >Crear</button>
                </div>
            </form>
        </div>
    );
}
export default Cat;