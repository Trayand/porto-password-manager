import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from './middlewares'
import reducer from './reducers/index'

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
    )
)

export default store