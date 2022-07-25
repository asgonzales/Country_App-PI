//Exportar variables con nombres
export const GET_FILTERS = 'GET_FILTERS';
export const POST_ACTIVITY = 'POST_ACTIVITY'

export const getFilters = (select) => {
    return async (dispatch) => {
        // console.log(select)
        return fetch(`http://localhost:3001/activities/${select}`)
        .then( r => r.json())
        .then( r => dispatch({type: GET_FILTERS, payload: r}))
    }
}

export const addActivity = (newActivity) => {
    return async (dispatch) => {
        return fetch(`http://localhost:3001/activities`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newActivity)
        })
        .then(r => r.json())

    }
}