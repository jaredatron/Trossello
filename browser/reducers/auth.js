const getInitialState = () => {
  return {
    isFetching: true,
    isAuthenticated: false,
    error: undefined,
    user: undefined,
  }
}

const auth = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'LOADING_SESSION':
      return {
        isFetching: true,
        isAuthenticated: false,
        error: undefined,
        user: undefined,
      }
    case 'SESSION_LOADED':
      return {
        isFetching: false,
        isAuthenticated: !!action.user,
        error: action.error,
        user: action.user,
      }
    case 'LOGOUT_SUCCESS':
      return {
        isFetching: false,
        isAuthenticated: false,
        error: undefined,
        user: undefined,
      }
    default:
      return state
  }
}

export default auth
