import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addActivity } from "../../redux/actions/activities/index.js";
import { getAllCountries } from '../../redux/actions/countries/index.js';



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
    const handleInputChange = ( e ) => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        })
        // console.log(activity)
    }
    const handleInputSearch = ( e ) => {
        setSearchCountries(countries.filter(item => item.name.toLowerCase().indexOf(e.target.value) > -1))
    }
    const handleSelected = (event, country ) => {
        if(event.target.checked) {
            setSelectedCountries([...selectedCountries, country])
            setActivity({
                ...activity,
                countries:[...activity.countries,country.id]
            })
        }
        else selectedCountries.splice(selectedCountries.indexOf(country.id), 1)
    }
    const deleteSelected = (event, country) => {
        if (!event.target.checked) {
            selectedCountries.splice(selectedCountries.indexOf(country.id), 1)
            activity.countries.splice(activity.countries.indexOf(country.id), 1)
        } 
    }
    const submitea2 = (e) => {
        e.preventDefault()
        console.log(activity)
        dispatch(addActivity(activity))
    }

    return (
        <div>
            SOY EL CAT
            <form onSubmit={submitea2}>
                <label>Nombre: </label>
                <input name='name' type='text' onChange={handleInputChange}></input>
                <br></br>
                <label>Dificultad: </label>
                <select name='difficult' onChange={handleInputChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br></br>
                <label>Duración: </label>
                <input name='duration' type='number' onChange={handleInputChange}></input>
                <br></br>
                <label>Temporada: </label>
                <select name='season' onChange={handleInputChange}>
                    <option name='Autumn' >Autumn</option>
                    <option name='Winter' >Winter</option>
                    <option name='Primavera' >Spring</option>
                    <option name='Verano' >Summer</option>
                </select>
                <br></br>
                <label>Países: </label>
                <input type='search' onChange={handleInputSearch}></input>
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
                <br></br>
                {
                    selectedCountries.map( e => {
                        return (
                            <div key={e.id}>
                                <input type='checkbox' defaultChecked onClick={(event) => deleteSelected(event, e.id)}></input>
                                <span>{e.name}</span>
                            </div>
                        )
                    })
                }
                <button type='submit'>Crear</button>
            </form>
        </div>
    );
}

export default Cat;