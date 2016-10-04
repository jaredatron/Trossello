import React, { Component } from 'react'
import './BoardShowPage.sass'
import Layout from './Layout'
import Link from './Link'
import PresentationalComponent from './PresentationalComponent'
import actions from '../actions'

class BoardShowPage extends Component {

  loadBoard(){
    const boardId = this.props.params.boardId
    actions.loadBoard(boardId)
  }

  componentWillMount(){
    this.loadBoard()
  }

  componentWillReceiveProps(nextProps){
    if (this.props.params.boardId !== nextProps.params.boardId)
      this.loadBoard()
  }

  render(){
    const { state } = this.props
    const boardId = this.props.params.boardId
    const board = state.boards[boardId]

    if (!board) return (
      <Layout className="BoardShowPage">
        <h1>Board Not Found</h1>
      </Layout>
    )

    if (board.loading) return (
      <Layout className="BoardShowPage">
        <h1>Loading...</h1>
      </Layout>
    )

    const lists = board.lists.map(list => {
      return <List key={list.id} list={list} />
    })

    const style = {
      backgroundColor: board.background_color
    }

    return <Layout className="BoardShowPage" style={style}>
      <div className="BoardShowPage-Header">
        <h1>{board.name}</h1>
      </div>

      <div className="BoardShowPage-lists">{lists}</div>
    </Layout>
  }
}

const List = (props) => {
  const { list } = props
  const cards = list.cards.map(card => {
    return <Card key={card.id} card={card} />
  })
  return <div className="BoardShowPage-List">
    <div className="BoardShowPage-ListHeader">{list.name}</div>
    <div className="BoardShowPage-cards">{cards}</div>
    <div className="BoardShowPage-add-card">Add a card…</div>
  </div>
}

const Card = (props) => {
  const { card } = props
  return <div className="BoardShowPage-Card">
    <div>{card.description}</div>
  </div>
}

export default PresentationalComponent(BoardShowPage)
