import './BoardsDropdown.sass'
import React, { Component } from 'react'

export default class BoardsDropdown extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const dropdown = this.state.open ? <Dropdown /> : null
    return <div className="BoardsDropdown">
      <button className={this.props.className}>Boards</button>
      {dropdown}
    </div>
  }

}


const Dropdown = (props) => {
  return <div className="BoardsDropdown-dropdown">
    the drop down
  </div>
}
