import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from './middlewares'
// import pokemonReducer from "./reducers/pokemonReducer";

const rootReducter = combineReducers({
    // pokemon: pokemonReducer
})
const store = createStore(rootReducter, applyMiddleware(thunk))

export default store