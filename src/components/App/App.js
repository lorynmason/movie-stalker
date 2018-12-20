import React, { Component } from 'react';
import { connect } from 'react-redux';
import { key } from '../../apikey';
import * as API from '../../helpers/apiCalls';
import { addMovies } from '../../actions';
import CardContainer from '../../containers/CardContainer/CardContainer';
import Menu from '../../components/Menu/Menu'
import Login from '../../containers/Login/Login';
import '../../styles/main.scss';

import './App.css';

class App extends Component {
  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_genres=27&without_genres=10751`;
    const movies = await API.fetchMovies(url);
    this.props.addMoviesToStore(movies);
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">Movie Stalker</h1>
        <Menu />
        {/* <Login /> */}
        <CardContainer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addMoviesToStore: moviesArray => dispatch(addMovies(moviesArray))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
