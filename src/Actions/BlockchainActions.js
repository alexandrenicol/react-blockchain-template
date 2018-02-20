export const types = {
  INIT_WEB3: 'INIT_WEB3',
  LOAD_OBJECTS: "LOAD_OBJECTS",
  LOAD_OBJECT: "LOAD_OBJECT",
}


export function initWeb3(dispatch, web3, account, objectManager) {
  dispatch({
    type: types.INIT_WEB3,
    web3: web3,
    account: account,
    objectManager: objectManager
  })
}

export function loadObjects(dispatch, objects) {
  dispatch({
    type: types.LOAD_OBJECTS,
    objects: objects
  })
}

export function loadObject(dispatch, object) {
  dispatch({
    type: types.LOAD_OBJECT,
    object: object
  })
}
