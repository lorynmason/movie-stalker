import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../actions';
import { fetchFavorites } from '../../thunks/fetchFavorites';

export const Message = (props) => {
  setTimeout(() => {
    props.addMessage(null)
  }, 1500);

  if(props.user) {
    props.addFavoritesToStore(props.user.id)
  }

  if(props.message) {
    return (
      <div className="message-container">
        <p>
          {props.message}
        </p>
      </div>
    )
  }
<<<<<<< Updated upstream
  return null
=======
  return (
    <div className="blah">
    </div>
  )
>>>>>>> Stashed changes
}

export const mapStateToProps = (state) => ({
  message: state.message,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  addMessage: message => dispatch(addMessage(message)),
  addFavoritesToStore: (userId) => dispatch(fetchFavorites(userId))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(Message);