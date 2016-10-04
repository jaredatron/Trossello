import React, { Component } from 'react'
import Icon from './Icon'
import './CreateBoardButton.sass'
import actions from '../actions'

export default class CreateBoardButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.createBoard = this.createBoard.bind(this)
  }

  toggleDropdown(){
    this.setState({
      open: !this.state.open
    })
  }

  createBoard(event) {
    event.preventDefault()
    const boardName = this.refs.name.value
    this.setState({ open: false })
    actions.createBoard(boardName)
  }

  render(){
    const dropdown = this.state.open ?
      <div className="CreateBoardButton-dropdown">
        <form onSubmit={this.createBoard}>
          <input ref="name" type="text" placeholder="Shopping List" />
          <input type="submit" value="Create" />
        </form>
      </div>
      :
      null
    return <div className="CreateBoardButton">
      <button className={this.props.className} onClick={this.toggleDropdown}>
        <Icon type="plus" />
      </button>
      {dropdown}
    </div>
  }
}
