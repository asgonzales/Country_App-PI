import { GET_ALL_COUNTRIES, GET_COUNTRIES_FILTER, GET_COUNTRY } from "../actions/countries";
import { GET_FILTERS } from "../actions/activities";
const initialState = {
    countries: ['ini'],  //paises listados en Home
    country: {},    //Pais detallado en Detalles    
    // continent: [],
    datosEnBase: false,
    // alph: '',
    // ppl: '',
    // continents:[],
    // name: [],
    // difficult: [],
    // duration: [],
    // actDiff: [],
    // actSeason: [],
    // season: [],
    actName: [],
    actDur: [],
};
 var prueba = 1
const rootReducer = (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        //CASOS DE COUNTRIES
        case GET_ALL_COUNTRIES: {
            // console.log('ALL COUNTRIES', prueba)
            prueba = prueba + 1
            return {
                ...state,
                datosEnBase: true,
                countries: action.payload,
            }
        }
        // case GET_CONTINENTS: {
        //     console.log('CONTINENTES')
        //     return {
        //         ...state,
        //         continents: action.payload
        //     }
        // }
        case GET_COUNTRIES_FILTER: {
            // console.log('COUNTRIES FILTER', prueba)
            prueba = prueba + 1
            return {
                ...state,
                countries: action.payload
            }
        }
        case GET_COUNTRY: {
            // console.log('COUNTRY')
            return {
                ...state,
                country: action.payload
            }
        }
        //CASOS DE ACTIVITIES
        case GET_FILTERS: {
            // console.log('FILTROSACTV')
            let key = ''
            console.log(action.payload)
            if (action.payload.length > 0 && Object.keys(action.payload[0])[0] === 'name') key = 'actName'
            // if (action.payload && Object.keys(action.payload[0])[0] === 'difficult') key = 'actDiff'
            if (action.payload.length > 0 && Object.keys(action.payload[0])[0] === 'duration') key = 'actDur'
            // if (action.payload && Object.keys(action.payload[0])[0] === 'season') key = 'actSeason'
            if(key !== '') {
                return {
                    ...state,
                    [key]: action.payload
                }
            }
            else {
                return state
            }
        }
        default: return state
    }
};

export default rootReducer;