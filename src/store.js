import {createStore} from 'redux';
import reducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, reducer)

const initialState = {
    isUserLoggedIn: false,
    user:{},
    users: [{
        "name": "arrow",
        "email": "arrow@gmail.com",
        "password": "123456",
        "is_admin": false,
        "last_login_at": "",
    },
    {
        "name": "john",
        "email": "john@gmail.com",
        "password": "123556",
        "is_admin": false,
        "last_login_at": "",
    }, {
        "name": "admin",
        "email": "admin@gmail.com",
        "password": "pass",
        "is_admin": true,
        "last_login_at": "",
    }, {
        "name": "user",
        "email": "user@gmail.com",
        "password": "pass",
        "is_admin": false,
        "last_login_at": "",
    }],
    leaves: [{
        "id":1,
        "user_id":"arrow@gmail.com",
        "type": "casual",
        "fromDate": "2018-09-16",
        "toDate": "2018-09-17",
        "status": "pending",
        "description": ""
    },
    {   
        "id":2,
        "user_id":"arrow@gmail.com",
        "type": "type",
        "fromDate": "2018-09-16",
        "toDate": "2018-09-17",
        "status": "pending",
        "description": ""
    },
    {   
        "id":3,
        "user_id":"john@gmail.com",
        "type": "sick",
        "fromDate": "2018-09-16",
        "toDate": "2018-09-17",
        "status": "pending",
        "description": ""
    },
    {   
        "id":4,
        "user_id":"john@gmail.com",
        "type": "casual",
        "fromDate": "2018-09-16",
        "toDate": "2018-09-17",
        "status": "pending",
        "description": ""
    }]
}
export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);

export default store;