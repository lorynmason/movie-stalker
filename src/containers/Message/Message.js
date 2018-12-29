import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Message extends Component {
  render() {
    if(this.props.message) {
      return (
        <div className="message-container">
          <p>
            {this.props.message}
          </p>
        </div>
      )
    }
    return null
  }
}


export const mapStateToProps = (state) => ({
  message: state.message
})

export default connect(
  mapStateToProps
)(Message);