import request from 'request'
import { browserHistory } from 'react-router'

export default (dispatch, boardName) => {
  dispatch({
    type: 'CREATING_BOARD',
    board: {
      name: boardName,
    }
  })

  request('post', '/api/boards', {body: {name: boardName}})
    .then(board => {
      console.log('board created', board)
      browserHistory.push('/boards/'+board.id)
      dispatch({
        type: 'BOARD_CREATED',
        board: board
      })
    })
    .catch( error => {
      dispatch({
        type: 'BOARD_CREATE_FAILED',
        error: error,
      })
    })
}
