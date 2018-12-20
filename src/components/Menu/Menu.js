import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions';
import { connect } from 'react-redux';

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

  handleClick = () => {
    this.props.logoutUser();
  }

  render(){
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
          <p className='menu-item' onClick={this.handleClick}>Logout</p>
          <p>
            <Link className='menu-item' to="/login" onClick={this.toggleMenu}>
              Login
            </Link>
          </p>
          <p>
            <Link className='menu-item' to="/favorites" onClick={this.toggleMenu}>
              Stalked:0
            </Link>
          </p>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
  });

export default connect(null, mapDispatchToProps)(Menu);