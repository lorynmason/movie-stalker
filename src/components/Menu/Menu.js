import React, { Component } from 'react';
import Login from '../../containers/Login/Login';
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      fullMenu: false
    };
  }

  toggleMenu = () => {
    this.setState({ fullMenu: !this.state.fullMenu });
  };

  render() {
    if (!this.state.fullMenu) {
      return (
        <div className="menu" onClick={this.toggleMenu}>
          <p>MENU</p>
        </div>
      );
    } else {
      return (
        <div className="full-menu">
          <button onClick={this.toggleMenu}>X</button>
          <p>
            <Link to="/login" onClick={this.toggleMenu}>
              Login
            </Link>
          </p>
          <p>
            <Link to="/favorites" onClick={this.toggleMenu}>
              Stalked:0
            </Link>
          </p>
        </div>
      );
    }
  }
}

export default Menu;
