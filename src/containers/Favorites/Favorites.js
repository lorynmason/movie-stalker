import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../../components/Card/Card';
import { postFavorites } from '../../thunks/postFavorites';
import { withRouter } from 'react-router';

export const Favorites = ({ allFavorites, user, addFavorite }) => {
  let cards;
  if(user) {
    console.log('hi')
    cards = allFavorites.map(movie => (
      <Card movie={movie} key={movie.title} addFavorite={addFavorite} user={user} />
    ));
  } else {
    cards = 'Please Login to View Favorites'
  }
  return <div className="cardContainer">{cards}</div>;
};

export const mapStateToProps = state => ({
  user: state.user,
  allFavorites: state.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavorite: (movie, userId) => dispatch(postFavorites(movie, userId))
});

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
