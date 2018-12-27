import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { key } from '../../apikey';
import CardContainer from '../../containers/CardContainer/CardContainer';
import Menu from '../../components/Menu/Menu';
import Login from '../../containers/Login/Login';
import { Favorites } from '../../components/Favorites/Favorites';
import { Link } from 'react-router-dom';
import '../../styles/main.scss';
import { fetchMovies } from '../../thunks/fetchMovies';

export class App extends Component {
  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_genres=27&without_genres=10751`;
    this.props.fetchMovies(url);
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">
          <span className="movie">
            <Link to="/">Movie</Link>
          </span>
          <span className="stalker">
            <Link to="/">Stalker</Link>
          </span>
        </h1>
        <Menu />
        <Switch>
          <Route exact path="/" component={CardContainer} />
          <Route
            path="/login"
            render={({ match }) => {
              return <Login />;
            }}
          />
          <Route path="/favorites" component={Favorites} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  fetchMovies: url => dispatch(fetchMovies(url))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);

App.propTypes = {
  fetchMovies: PropTypes.func.isRequired
};
