const getInitialState = () => {
  return {
    records: {},
    loading: false,
    loadingFailed: undefined,
    loadingError: undefined,
  }
}

// const addRecords = (recordsHash, recordsArray) => {
//   return recordsArray.reduce((hash, record) => {
//     hash[record.id] = record
//     return hash
//   }, Object.assign({},recordsHash))
// }

const extend = (state, updates) => Object.assign({}, state, updates)

const boards = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'LOADING_BOARDS':
      return extend(state, {
        loading: true,
        loadingFailed: undefined,
        loadingError: undefined,
      })

    case 'BOARDS_LOADED':
      return extend(state, {
        records: action.boards,
        loading: false,
      })

    case 'BOARDS_LOAD_FAILED':
      return extend(state, {
        loading: false,
        loadingFailed: true,
        loadingError: action.error,
      })

    case 'CREATING_BOARD':
      return state;

    case 'BOARD_CREATED':
      return state

    case 'BOARD_CREATE_FAILED':
      return state;

    case 'LOADING_BOARD':
      return extend(state, {
        [action.boardId]: {loading: true}
      })

    case 'BOARD_LOADED':
      return extend(state, {
        [action.board.id]: action.board
      })

    case 'BOARD_LOAD_FAILED':
      return extend(state, {
        [action.boardId]: {error: action.error}
      })

    default:
      return state
  }
}

export default boards


// dispatch({
//   type: 'LOADING_BOARD',
//   boardId: 12,
// })
