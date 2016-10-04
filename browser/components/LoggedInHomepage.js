import React, { Component } from 'react'
import Layout from './Layout'
import PresentationalComponent from './PresentationalComponent'
import Link from './Link'
import './LoggedInHomepage.sass'

class LoggedInHomepage extends Component {
  componentWillMount(){
    // actions.loadBoards()
  }

  render(props) {
    const { auth, state } = props
    console.log('state', state)
    return <Layout className="LoggedInHomepage">
      <div className = "LoggedInHomepage-BoardListHeading">
        Personal Boards
      </div>
      <Boards boards={state.boards} />
    </Layout>
  }
}

export default PresentationalComponent(LoggedInHomepage)

const BoardListHeading = (props) => {
  return
}

const Boards = ({boards}) => {
  const elements = Object.keys(boards).map(boardId =>
    <Board key={boardId} board={board[boardId]} />
  )
  return <div className="LoggedInHomepage-Boards">
    {elements}
  </div>
}

const Board = ({board}) => {
  return <Link to={`/boards/${board.id}`} className="LoggedInHomepage-Board">
    <div>{board.name}</div>
  </Link>
}
