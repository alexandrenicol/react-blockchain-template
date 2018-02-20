import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import UIReducer from './Reducers/UIReducer';
import Web3Reducer from './Reducers/Web3Reducer';
import ObjectsReducer from './Reducers/ObjectsReducer';

export default function newStore(middleware) {
  const store = createStore(
    combineReducers({
      ui: UIReducer,
      blockchain: Web3Reducer,
      router: routerReducer,
      objects: ObjectsReducer
    }),
    applyMiddleware(middleware)
  )

  return store;
}
