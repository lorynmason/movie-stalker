import React from 'react';
import { connect } from 'react-redux';

export const Message = (props) => {
  if(props.message) {
    return (
      <div className="message-container">
        <p>
          {props.message}
        </p>
      </div>
    )
  }
  return null
}


export const mapStateToProps = (state) => ({
  message: state.message
})

export default connect(
  mapStateToProps
)(Message);