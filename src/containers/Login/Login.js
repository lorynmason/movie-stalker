import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../../helpers/apiCalls';
import { loginUser } from '../../actions';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      name: ''
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    const { email, password } = this.state;
    e.preventDefault();
    const response = await API.fetchUser('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response) {
      this.props.addUserToStore(response.data);
      this.setState({
        errorMessage: ''
      });
    } else {
      this.setState({
        errorMessage: 'Email and Password do not match'
      });
    }
  };

  handleClick = async e => {
    const { email, password, name } = this.state;
    e.preventDefault();
    //try
    const response = await API.postUser('http://localhost:3000/api/users/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const jsonResponse = await response.json();
    if (response.ok) {
      this.props.addUserToStore({email, password, name, id: jsonResponse.id});
      this.setState({
        errorMessage: ''
      });
    } else {
      debugger
      this.setState({
        errorMessage: 'Email has already been used'
      });
    }
    //catch throw error
  }

  render() {
    const { email, password, name } = this.state;
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <h1>LOGIN</h1>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={this.handleInputChange}
            name="name"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={this.handleInputChange}
            name="email"
            // pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
            // required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handleInputChange}
            name="password"
          />
          <button>Submit</button>
        </form>
        <button onClick={this.handleClick}>Create User</button>
        <p>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  addUserToStore: user => dispatch(loginUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
