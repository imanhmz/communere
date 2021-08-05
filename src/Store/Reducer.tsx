import {Action} from "./Action";
import {IState} from "../Interface/Form";
export interface dataState{
    data: IState[]
}
const initialState:dataState={
   data:[]
}
export const formReducer=(state:dataState=initialState,action:Action)=>{
    switch (action.type) {
        case "ADD_DATA": {
            console.log({...state,data:[...state.data,action.payload]})
            return {...state,data:[...state.data,action.payload]}
        }
        default:
            return state
    }
}