import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';

import chamaDetailsReducer from './modules/chamaDetails';
import chamaAdminReducer from './modules/chamaAdmin';
import authReducer from './modules/auth';
import chamaAccountsReducer from './modules/chamaAccounts';

const rootReducer = combineReducers({
    form: formReducer,
    chamaDetails: chamaDetailsReducer,
    chamaAdmin: chamaAdminReducer,
    auth: authReducer,
    chamaAccounts: chamaAccountsReducer,
});

export default rootReducer;