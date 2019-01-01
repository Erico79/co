import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import chamaDetailsReducer from './modules/chamaDetails';

const rootReducer = combineReducers({
    form: formReducer,
    chamaDetails: chamaDetailsReducer,
});

export default rootReducer;