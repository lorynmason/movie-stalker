import React, { Component } from 'react'

class Menu extends Component{
  constructor(){
    super()
    this.state = {
      fullMenu: false
    }
  }
  
  toggleMenu = () => {
    this.setState({fullMenu: !this.state.fullMenu})
  }

  render(){
    if (!this.state.fullMenu) {
      return(
       <div className='menu' onClick={this.toggleMenu}>
        <p>MENU</p>
       </div>
      )
    } else {
      return (
      <div className='full-menu'>
        <button onClick={this.toggleMenu}>X</button>
        <p>Login</p>
        <p>Stalked:0</p>
      </div>
      )
    }
  }
}

export default Menu
