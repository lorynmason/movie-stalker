import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { App, mapDispatchToProps } from './App';

import { fetchMovies } from '../../thunks/fetchMovies';

describe.skip('App', () => {
  const wrapper = shallow(<App fetchMovies={fetchMovies} />);
  it('matches snapshot with all data correctly rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch fetchMovies with a url on componentDidMount', () => {
      const mockDispatch = jest.fn();
      const mockUrl = 'https:www.moviedb.com';

      const actionToDispatch = fetchMovies(mockUrl);

      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.fetchMovies(mockUrl);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
