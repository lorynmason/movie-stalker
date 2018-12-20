import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../../components/Card/Card';

export const CardContainer = ({ movies }) => {
  const cards = movies.map(movie => <Card {...movie} />);
  return <div className='cardContainer'>{cards}</div>;
};

export const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(CardContainer);
