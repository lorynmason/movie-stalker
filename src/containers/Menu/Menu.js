import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser, addMessage } from '../../actions';
import { connect } from 'react-redux';

export class Menu extends Component {
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
    this.props.addMessage('You are now logged out')
    this.toggleMenu();
  };

  render() {
    let log = (
      <p>
        <Link className="menu-item" to="/login" onClick={this.toggleMenu}>
          Login
        </Link>
      </p>
    );
    
    if (this.props.user) {
      log = (
        <p className="menu-item" id="logout" onClick={this.handleClick}>
          Logout
        </p>
      );
    }
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
          {log}
          <p>
            <Link className='menu-item' to="/favorites" onClick={this.toggleMenu}>
              Stalked: <span>{this.props.allFavorites.length}</span>
            </Link>
          </p>
        </div>
      );
    }
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  allFavorites: state.favorites
})

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  addMessage: (message) => dispatch(addMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

Menu.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func.isRequired
};
