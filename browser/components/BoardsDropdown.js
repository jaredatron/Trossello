import './BoardsDropdown.sass'
import React, { Component } from 'react'

export default class BoardsDropdown extends Component {

  render() {
    return <div className="BoardsDropdown">
      <button className={this.props.className}>Boards</button>
      <Dropdown />
    </div>
  }

}


const Dropdown = (props) => {
  return <div className="BoardsDropdown-dropdown">
    the drop down
  </div>
}
