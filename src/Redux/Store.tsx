import {createStore} from "redux";
import {formReducer} from './Reducer'
export const store = createStore(formReducer)