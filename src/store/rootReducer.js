import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

import chamaDetailsReducer from './modules/chamaDetails';
import chamaAdminReducer from './modules/chamaAdmin';

const rootReducer = combineReducers({
    form: formReducer,
    chamaDetails: chamaDetailsReducer,
    chamaAdmin: chamaAdminReducer,
});

export default rootReducer;