export const GET_COUNTRIES_FILTER = 'GET_COUNTRIES_FILTER';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_CONTINENTS = 'GET_CONTINENTS';


//Ruta para obtener países con filtros aplicados
export const getCountriesFilter = (name, alph, ppl, continent, activityName, activityDiff, activityDur, activitySeason) => {
    
    return  async (dispatch) => {
        let url = new URL('https://country-app-001.herokuapp.com/countries') //Creo la url a la cual hacer el get

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

//Ruta para obtener los detalles de un país
export const getCountryDetail = (id) => {
    return async (dispatch) => {
        return fetch(`https://country-app-001.herokuapp.com/countries/${id}`)
        .then( r => r.json())
        .then( r => dispatch({type: GET_COUNTRY, payload: r}))
    }
}