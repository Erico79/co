const SUBMIT_CHAMA_DETAILS_REQUEST = 'chama-app/SUBMIT_CHAMA_DETAILS_REQUEST';
const SUBMIT_CHAMA_DETAILS_SUCCESS = 'chama-app/SUBMIT_CHAMA_DETAILS_SUCCESS';
const SUBMIT_CHAMA_DETAILS_FAILURE = 'chama-app/SUBMIT_CHAMA_DETAILS_FAILURE';

const initialState = {
    isLoading: false,
    errorMessage: '',
    info: {},
};

const chamaDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SUBMIT_CHAMA_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case SUBMIT_CHAMA_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                info: action.payload.data,
            }

        case SUBMIT_CHAMA_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.errorMessage
            }

        default:
            return state;
    }
}

// action creators
export function submitChamaDetails (chamaDetails) {
    return dispatch => {
        dispatch({type: SUBMIT_CHAMA_DETAILS_REQUEST});
    }
}

export default chamaDetailsReducer;