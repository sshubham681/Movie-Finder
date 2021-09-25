import React, { Component } from 'react';
import Nav from './components/Nav';
import SearchArea from './components/SearchArea';
import MovieList from './components/MovieList'
import Paginations from './components/Paginations'
import MovieInfo from './components/MovieInfo';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      searchItem: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
    }
    this.apiKey = process.env.REACT_APP_API
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API}&query=${this.state.searchItem}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: [...data.results], totalResults: data.total_results })
      })
  }
  handleChange = (event) => {
    this.setState({ searchItem: event.target.value })
  }
  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API}&query=${this.state.searchItem}&page=${pageNumber}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: [...data.results], currentPage: pageNumber })
      })
  }
  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id);
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({ currentMovie: newCurrentMovie })
  }
  closeMovieInfo = () => {
    this.setState({ currentMovie: null })
  }

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);
    return (

      <div className="App">
        <Nav />
        {this.state.currentMovie == null ?
          <div>
            <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            <MovieList movies={this.state.movies} viewMovieInfo={this.viewMovieInfo} />
          </div>
          : <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo} />}



        {this.state.totalResults > 20 && this.state.currentMovie == null ? <Paginations pages={numberPages}
          nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
      </div>
    );
  }
}


export default App;
