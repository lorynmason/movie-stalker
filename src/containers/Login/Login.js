import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../../helpers/apiCalls';
import { loginUser } from '../../actions';
import { Redirect } from 'react-router';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
      newUser: false
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  
  handleSubmit = async e => {
    e.preventDefault();
    const { email, password, newUser, name } = this.state;
    let response;
    if (newUser) {
      response = await API.postUser('http://localhost:3000/api/users/new', {
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
    } else {
      response = await API.fetchUser('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
    }
    this.handleResponse(response)
  }
  
  handleResponse = async (response) => { 
    const parsedResponse = await response.json();
    console.log(parsedResponse)
    switch (parsedResponse.message) {
      case 'Retrieved ONE User':
        this.props.addUserToStore(parsedResponse.data);
        this.setState({
          errorMessage: '',
          email: '',
          password: ''
        });
        break;
      case 'New user created':
        const { email, password, name } = this.state;
        this.props.addUserToStore({email, password, name, id: parsedResponse.id});
        this.setState({
          errorMessage: '',
          name: '',
          email: '',
          password: ''
        });
        break;
      default: 
        console.log(response);
        // errorMessage: 'Email has already been used'
        // errorMessage: 'Email and Password do not match'
    }
  }

  handleNewUser = (e) => {
    e.preventDefault();
    this.setState({
      newUser: true
    })
  }

  render() {
    const { email, password, name, newUser } = this.state;
    let nameInput;
    let buttonText;
    let page;
    if (newUser) {
      buttonText = 'Create New Account'
      nameInput = (
        <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={this.handleInputChange}
              name="name"
            />
      )
    } else {
      buttonText = 'Submit';
      nameInput = '';
    }
    if(this.props.user) {
      page = <Redirect to='/' />
    }

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <h1>LOGIN</h1>
          {nameInput}
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
          <button>{buttonText}</button>
        </form>
        <p classname="create-account"onClick={this.handleNewUser}>Click here to create an account</p>
        <p>{this.state.errorMessage}</p>
        {page}
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  addUserToStore: user => dispatch(loginUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
