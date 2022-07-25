//Exporto los nombres de los types
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRIES_FILTER = 'GET_COUNTRIES_FILTER';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_CONTINENTS = 'GET_CONTINENTS';

//Exporto las funciones 
export const getAllCountries = () => {
    // console.log('actions')
    return  async (dispatch) => {
        return await fetch('http://localhost:3001/countries')
                .then( r => r.json())
                .then( r => dispatch({type: GET_ALL_COUNTRIES, payload: r}));
    };
};

export const getContinents = () => {
    return async (dispatch) => {
        return await fetch('http://localhost:3001/countries/continents')
                .then( r => r.json())
                .then( r => dispatch({type: GET_CONTINENTS, payload: r}))
    }
}

export const getCountriesFilter = (name, alph, ppl, continent, activityName, activityDiff, activityDur, activitySeason) => {

    
    return  async (dispatch) => {
        let url = new URL('http://localhost:3001/countries') //Creo la url a la cual hacer el get

        //compruebo si cada parámetro tiene algún valor y los agrego como query si es así
        if (!!name) url.searchParams.append('name', name)
        if (!!alph) url.searchParams.append('alph', alph)
        if (!!ppl) url.searchParams.append('ppl', ppl)
        if (!!continent) url.searchParams.append('continent', continent)
        if (!!activityName) url.searchParams.append('activityName', activityName.join(','))
        if (!!activityDiff) url.searchParams.append('activityDiff', activityDiff.join(','))
        if (!!activityDur) url.searchParams.append('activityDur', activityDur.join(','))
        if (!!activitySeason) url.searchParams.append('activitySeason', activitySeason.join(','))

        //Realizo el fetch al servidor
        return await fetch(url.href)
                .then( r => r.json())
                .then( r => dispatch({type: GET_COUNTRIES_FILTER, payload: r}));
    };
};

export const getCountryDetail = (id) => {
    return async (dispatch) => {
        return fetch(`http://localhost:3001/countries/${id}`)
        .then( r => r.json())
        .then( r => dispatch({type: GET_COUNTRY, payload: r}))
    }
}