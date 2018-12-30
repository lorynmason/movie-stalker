import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from '../../components/Card/Card';
import { postFavorites } from '../../thunks/postFavorites';
import { deleteFavorite } from '../../thunks/deleteFavorite';
import { addMessage } from '../../actions';

export const CardContainer = ({
  movies,
  addFavorite,
  addMessage,
  removeFavorite,
  user,
  favorites,
  match
}) => {
  let array = movies;

  if (match.path === '/favorites') {
    if (favorites.length === 0 && user) {
      return <p className="stalked-message">You have not Stalked any Movies</p>;
    }
    if (!user) {
      return <p className="stalked-message">Login to see Stalked Movies</p>;
    }
    array = favorites;
  }

  const sendMessage = message => {
    addMessage(message);
  };

  const cards = array.map(movie => {
    let isFavorite = false;
    favorites.forEach(fav => {
      if (fav.movie_id === movie.movie_id) {
        isFavorite = true;
      }
    });

    return (
      <Card
        movie={movie}
        key={movie.title}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        user={user}
        isFavorite={isFavorite}
        sendMessage={sendMessage}
      />
    );
  });
  
  return <div className="cardContainer">{cards}</div>;
};

export const mapStateToProps = state => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavorite: (movie, userId) => dispatch(postFavorites(movie, userId)),
  removeFavorite: (userId, movieId) =>
    dispatch(deleteFavorite(userId, movieId)),
  addMessage: message => dispatch(addMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);

CardContainer.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  sendMessage: PropTypes.func,
  removeFavorite: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  user: PropTypes.object,
  match: PropTypes.object.isRequired
};
