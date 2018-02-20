import { types } from '../../Actions/BlockchainActions.js'

const initialState = {
  objects: [],
  currentObject: undefined
}

const ObjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_OBJECTS:
      console.log('LOAD_OBJECTS', action.objects);
      return {...state,
        objects: action.objects,
      }
    case types.LOAD_OBJECT:
      console.log('LOAD_OBJECT', action.object);
      return {...state,
        currentObject: action.object,
      }
    default:
      return state;

  }
}

export default ObjectsReducer;
