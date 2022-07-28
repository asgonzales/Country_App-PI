import { GET_ALL_COUNTRIES, GET_COUNTRIES_FILTER, GET_CONTINENTS, GET_COUNTRY } from "../actions/countries";
import { GET_FILTERS } from "../actions/activities";
const initialState = {
    countries: [],  //paises listados en Home
    country: {},    //Pais detallado en Detalles    
    // alph: '',
    ppl: '',
    continents:[],
    continent: [],
    actName: [],
    name: [],
    actDiff: [],
    difficult: [],
    actDur: [],
    duration: [],
    actSeason: [],
    season: [],
};

const rootReducer = (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        //CASOS DE COUNTRIES
        case GET_ALL_COUNTRIES: {
            return {
                ...state,
                countries: action.payload,
            }
        }
        case GET_CONTINENTS: {
            return {
                ...state,
                continents: action.payload
            }
        }
        case GET_COUNTRIES_FILTER: {
            return {
                ...state,
                countries: action.payload
            }
        }
        case GET_COUNTRY: {
            return {
                ...state,
                country: action.payload
            }
        }
        //CASOS DE ACTIVITIES
        case GET_FILTERS: {
            let key = ''
            if (Object.keys(action.payload[0])[0] === 'name') key = 'actName'
            if (Object.keys(action.payload[0])[0] === 'difficult') key = 'actDiff'
            if (Object.keys(action.payload[0])[0] === 'duration') key = 'actDur'
            if (Object.keys(action.payload[0])[0] === 'season') key = 'actSeason'
            return {
                ...state,
                [key]: action.payload
            }
        }
        default: return state
    }
};

export default rootReducer;