const UIReducer = (state = {isLoading: false}, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return {...state, isLoading: true}
    case 'IS_NOT_LOADING':
      return {...state, isLoading: false}
    default:
      return state;

  }
}

export default UIReducer;
