import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../actions';
import { fetchFavorites } from '../../thunks/fetchFavorites';

export const Message = (props) => {
  setTimeout(() => {
    update()
  }, 1500);

  const update = () => {
    props.addMess(null)
  }

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
  return null
}

export const mapStateToProps = (state) => ({
  message: state.message,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  addMess: message => dispatch(addMessage(message)),
  addFavoritesToStore: (userId) => dispatch(fetchFavorites(userId))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(Message);