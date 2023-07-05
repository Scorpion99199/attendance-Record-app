import {createContext,useReducer} from 'react';

const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
}
function reducer(state,action){
    switch (action.type) {
        case "USER_SIGNIN":
            return{
                ...state,userInfo:action.payload
            }
            case 'USER_SIGNOUT':
                return{
                  ...state,userInfo:null
                };
            
            
    
        default:
            break;
    }
}
export const Store=createContext();



export function StoreProvider({children}) {
    const [state,dispatch]=useReducer(reducer,initialState);
    
  return <Store.Provider value={{state,dispatch}}>{children} </Store.Provider>;
}