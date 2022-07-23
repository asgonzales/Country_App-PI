//Exporto los nombres de los types
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRIES_FILTER = 'GET_COUNTRIES_FILTER';
export const GET_COUNTRY = 'GET_COUNTRY';

//Exporto las funciones 
export const getAllCountries = () => {
    // console.log('actions')
    return  async (dispatch) => {
        return await fetch('http://localhost:3001/countries')
                .then( r => r.json())
                .then( r => dispatch({type: GET_ALL_COUNTRIES, payload: r}));
    };
};

export const getCountriesFilter = (name, alph, ppl, continent, activityName, activityDiff, activityDur, activitySeason) => {
    return  async (dispatch) => {
        let url = new URL('http://localhost:3001/countries') //Creo la url a la cual hacer el get

        //compruebo si cada parámetro tiene algún valor y los agrego como query si es así
        // name?url.searchParams.append('name', name):null;
        // alph?url.searchParams.append('alph', alph):null;
        // ppl?url.searchParams.append('ppl', ppl):null;
        // continent?url.searchParams.append('continent', continent):null;
        // activityName?url.searchParams.append('activityName', activityName):null;
        // activityDiff?url.searchParams.append('activityDiff', activityDiff):null;
        // activityDur?url.searchParams.append('activityDur', activityDur):null;
        // activitySeason?url.searchParams.append('activitySeason', activitySeason):null;

        //Realizo el fetch al servidor
        return await fetch(url.href)
                .then( r => r.json())
                .then( r => dispatch({type: GET_COUNTRIES_FILTER, payload: r}));
    };
};