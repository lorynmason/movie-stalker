import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false
    };
  }
  handleClick = () => {
    if (!this.state.isFavorite) {
      this.props.addFavorite(this.props.movie, this.props.user.id);
    }
    this.state.isFavorite = !this.state.isFavorite
  };

  render() {
    console.log(this.props.isFavorite)
    let heart = "far fa-heart"
    if(this.props.isFavorite) {
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
