import {Action} from "./Action";
export interface dataState{
    data: {
        lat?:number,
        lng?:number,
        locationName?:string,
        locationType?:string,
        icon?:string
    }[]
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