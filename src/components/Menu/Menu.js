import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions';
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
        <p className="menu-item" onClick={this.handleClick}>
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
            <Link
              className="menu-item"
              to="/favorites"
              onClick={this.toggleMenu}
            >
              Stalked:0
            </Link>
          </p>
        </div>
      );
    }
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

Menu.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func.isRequired
};
