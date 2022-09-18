import { GET_COUNTRIES_FILTER, GET_COUNTRY } from "../actions/countries";
import { GET_FILTERS } from "../actions/activities";
const initialState = {
    countries: [],  //paises listados en Home
    country: {},    //Pais detallado en Detalles    
    datosEnBase: false, //Switch creado para evitar problemas con los get de los filtros cuando no hay datos en la bd

    //Variables para almacenar los nombres y duraciones de las actividades para los filtros de búsqueda
    actName: [],
    actDur: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        //CASOS DE COUNTRIES
        case GET_COUNTRIES_FILTER: {
            return {
                ...state,
                datosEnBase: true,
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
            if (action.payload.length > 0 && Object.keys(action.payload[0])[0] === 'name') key = 'actName'
            if (action.payload.length > 0 && Object.keys(action.payload[0])[0] === 'duration') key = 'actDur'
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