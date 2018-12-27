import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Card extends Component {
  constructor(props) {
    super();
    this.state = {
      isFavorite: props.isFavorite
    }
  }

  handleClick = () => {
    const { movie, user, isFavorite } = this.props
    if (!user) {
      // add message "you must login to favorite"
      return;
    }

    if (isFavorite) {
      this.props.removeFavorite(user.id, movie.movie_id)
    } else {
      this.props.addFavorite(movie, user.id);
    }

    this.setState({
      isFavorite: !this.state.isFavorite
    })
  };

  render() {
    let heart = "far fa-heart"
    if(this.props.isFavorite || this.state.isFavorite) {
      heart = "fas fa-heart-broken"
    }

    const {
      title,
      release_date,
      overview,
      movie_id,
      poster_path
    } = this.props.movie;

    return (
      <div
        className="card"
        key={movie_id}
        style={{ backgroundImage: `URL(${poster_path})` }}
      >
        <button onClick={this.handleClick}>
          <i className={heart} />
        </button>
        <div>
          <h1>{title}</h1>
          <p>{release_date}</p>
          <p>{overview}</p>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  user: PropTypes.object
};
