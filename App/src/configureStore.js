import { compose,createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './redux';

export default function configureStore(initialState) {
   
    
    const reduxLogger = createLogger({predicate: (getState, action) => true});
    let middlewares = [thunk]
   
    if(true){
        middlewares = [...middlewares,reduxLogger];
    }
    return createStore(
        
        rootReducer,
        initialState,
        compose(applyMiddleware(...middlewares)),
    );

}