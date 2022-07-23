import { GET_ALL_COUNTRIES } from "../actions";

const initialState = {
    countries: [],
    country: {}
};

const rootReducer = (state = initialState, action) => {
    // console.log(action.type)
    switch (action.type) {
        case GET_ALL_COUNTRIES: {
            // console.log('LLEGÓ AL STORE')
            return {
                ...state,
                countries: action.payload,
            }
        }
        default: return state
    }
};

export default rootReducer;