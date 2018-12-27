import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from '../../components/Card/Card';
import { postFavorites } from '../../thunks/postFavorites';

export const CardContainer = ({ movies, addFavorite, user, favorites }) => {
  const cards = movies.map(movie => {
    let isFavorite = false
    favorites.forEach(fav => {
      if(fav.movie_id === movie.movie_id) {
        isFavorite = true
      }
    })
    return (<Card movie={movie} key={movie.title} addFavorite={addFavorite} user={user} isFavorite={isFavorite}/>)
  }
  );
  return <div className="cardContainer">{cards}</div>;
};

export const mapStateToProps = state => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavorite: (movie, userId) => dispatch(postFavorites(movie, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);

CardContainer.propTypes = {
  addFavorite: PropTypes.func.isRequired
};
