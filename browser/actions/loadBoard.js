import request from 'request'
import { browserHistory } from 'react-router'

export default (dispatch, boardId) => {
  dispatch({
    type: 'LOADING_BOARD',
    boardId,
  })

  request('get', `/api/boards/${boardId}`)
    .then(board => {
      dispatch({
        type: 'BOARD_LOADED',
        board: board
      })
    })
    .catch( error => {
      dispatch({
        type: 'BOARD_LOAD_FAILED',
        error: error,
      })
    })
}
