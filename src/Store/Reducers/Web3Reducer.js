import { types } from '../../Actions/BlockchainActions.js'


const initialState = {
  web3: undefined,
  web3Account: undefined,
  objectManager: undefined,
}

const Web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_WEB3:
      console.log('NEW_WEB3', action.web3);
      return {...state,
        web3: action.web3,
        web3Account: action.account,
        objectManager: action.objectManager,
      }
    default:
      return state;

  }
}

export default Web3Reducer;
