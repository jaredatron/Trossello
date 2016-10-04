import request from 'request'
import { browserHistory } from 'react-router'

export default (dispatch,) => {
  dispatch({
    type: 'LOADING_BOARDS',
  })

  request('get', `/api/boards`)
    .then( boards => {
      dispatch({
        type: 'BOARDS_LOADED',
        boards: boards
      })
    })
    .catch( error => {
      dispatch({
        type: 'BOARDS_LOAD_FAILED',
        error: error,
      })
    })
}
