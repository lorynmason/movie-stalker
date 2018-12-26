import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchUser } from '../../thunks/fetchUser'
import { postUser } from '../../thunks/postUser'

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
    if (newUser) {
      this.props.addNewUserToStore(email, password, name)
    } else {
     this.props.addUserToStore(email, password)
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
    let createNewUser = <p className="create-account"onClick={this.handleNewUser}>Click here to create an account</p>
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
      createNewUser = ''
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
        {createNewUser}
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
  addUserToStore: (email, password) => dispatch(fetchUser(email, password)),
  addNewUserToStore: (email, password, name) => dispatch(postUser(email, password, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
