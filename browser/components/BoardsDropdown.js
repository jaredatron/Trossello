import './BoardsDropdown.sass'
import React, { Component } from 'react'

class BoardsDropdown extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle(){
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const dropdown = this.state.open ? <Dropdown /> : null
    return <div className="BoardsDropdown" onClick={this.toggle}>
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

class BoardsProvider extends Component {
  render(){
    const props = Object.assign({}, this.props)
    return <BoardsDropdown {...props} />
  }
}

export default BoardsProvider
