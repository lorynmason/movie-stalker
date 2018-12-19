import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as API from '../../helpers/apiCalls';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const user = await API.fetchUser('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    console.log(user);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>LOGIN</h1>
          <input
            type="text"
            value={email}
            onChange={this.handleInputChange}
            name="email"
          />
          <input
            type="text"
            value={password}
            onChange={this.handleInputChange}
            name="password"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  //dispatch action creators
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
