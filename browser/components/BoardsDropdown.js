import $ from 'jquery'
import './BoardsDropdown.sass'
import React, { Component } from 'react'

class BoardsDropdown extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: true
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle(){
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const dropdown = this.state.open ?
      <Dropdown boards={this.props.boards} /> :
      null
    return <div className="BoardsDropdown" onClick={this.toggle}>
      <button className={this.props.className}>Boards</button>
      {dropdown}
    </div>
  }

}


const Dropdown = (props) => {
  const boards
  if (props.boards === null){
    boards = <div>Loading...</div>
  }else{
    boards = props.boards.map(board => {
      return <div key={board.id}>{board.name}</div>
    })
  }
  return <div className="BoardsDropdown-dropdown">
    {boards}
  </div>
}

class BoardsProvider extends Component {

  constructor(props){
    super(props)
    this.state = {
      boards: null,
    }
  }

  componentWillMount(){
    $.getJSON('/api/boards')
      .then(boards => {
        this.setState({boards})
      })
  }

  render(){
    const props = Object.assign({}, this.props)
    props.boards = this.state.boards
    return <BoardsDropdown {...props} />
  }

}

export default BoardsProvider
