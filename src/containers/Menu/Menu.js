import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser, addMessage, removeFavorites } from '../../actions';
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
    localStorage.removeItem('user');
    this.props.logoutUser();
    this.props.removeFavorites();
    this.props.addMessage('You are now logged out');
    this.toggleMenu();
  };

  render() {
    let log = (
      <p>
        <Link className="menu-item" id="login" to="/login" onClick={this.toggleMenu}>
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
          <div className="menu-items">
            <button onClick={this.toggleMenu}>X</button>
            <p>
              <Link className="menu-item a-tag" to="/" onClick={this.toggleMenu}>
                Home
              </Link>
            </p>
            {log}
            <p>
              <Link
                className="menu-item a-tag"
                to="/favorites"
                onClick={this.toggleMenu}
                >
                Stalked: <span>{this.props.allFavorites.length}</span>
              </Link>
            </p>
          </div>
        </div>
      );
    }
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  allFavorites: state.favorites
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  addMessage: message => dispatch(addMessage(message)),
  removeFavorites: () => dispatch(removeFavorites())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

Menu.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func.isRequired
};
