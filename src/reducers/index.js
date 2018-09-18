//Action types
export const APPROVE_LEAVE = 'APPROVE_LEAVE';
export const REJECT_LEAVE = 'REJECT_LEAVE';
export const LOGIN_USER = 'LOGIN_USER';
export const APPLY_LEAVE= 'APPLY_LEAVE';
export const LOG_OUT= 'LOG_OUT';
export const SET_LAST_LOG_IN = 'SET_LAST_LOG_IN';

export default function (state, action) {
    switch (action.type) {
        case LOGIN_USER:{
            return {...state,
                isUserLoggedIn:true,
                user: action.payload
            }
        }
        case LOG_OUT:{
            return {...state,
                isUserLoggedIn:false,
                user: null
            }
        }
        case SET_LAST_LOG_IN:{

            const user = state.users.find((user) => user.email===action.payload.userId);
            user.last_login_at = action.payload.time;
            const users = [...state.users, user]

            return {...state, users};
        }

        case APPLY_LEAVE:{
            const leaves = [...state.leaves, action.payload]
            return {...state,leaves:leaves};
        }
        case APPROVE_LEAVE:{
            const leaves = state.leaves.map((leave) => {
                if(leave.id===action.payload){
                    return {...leave, status:'approved'}
                }
                return leave;
            });
            
            return {...state,leaves:leaves}
        }
        case REJECT_LEAVE:{
            const leaves = state.leaves.map((leave) => {
                if(leave.id===action.payload){
                    return {...leave, status:'rejected'}
                }
                return leave;
            });

            return {...state,leaves:leaves}
        }
        default: { 
            return state;
        }
    }
}
