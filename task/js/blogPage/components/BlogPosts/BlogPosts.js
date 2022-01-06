import { Component } from '../../../core/index.js';
import { ImageCard } from '../BlogPosts/ImageCard/ImageCard.js';
import { AudioCard } from '../BlogPosts/AudioCard/AudioCard.js';
import { TextCard } from '../BlogPosts/TextCard/TextCard.js';
import { VideoCard } from './VideoCard/VideoCard.js';
import { ReadMoreButton } from '../../components/BlogPosts/ReadMoreButton/ReadMoreButton.js';

export class BlogPosts extends Component {
  constructor(gs, fetchMovies) {
    super({
      className: 'blog__posts-wrapper'
    });
    gs.subscribe(this);
    const { movies, search, selectOption, activeCountOfPostSets } =
      gs.getState();

    this.movies = movies;
    this.search = search;
    this.selectOption = selectOption;
    this.activeCountOfPostSets = activeCountOfPostSets;
    this.gs = gs;
    this.handleSearchMovies = () => fetchMovies(this.search);
    this.countOfCardOnPage = 4;
    this.filteredByAutorMovies = '';

    this._setDefaultToDo();

    movies.length
      ? this._render()
      : this.findNode('.blog__posts-wrapper').html(`
      <div class="blog__tip blog__tip-display-off">No results</div>
        <main class="blog__posts">
          <div class="blog__empty-posts">
            <h2 class="blog__empty-message">
              Please, use the search to find movies
            </h2>
          </div> 
        </main>
        `);
  }
  _drawCardList(movies) {
    const currentPartOfMovies = movies.slice(
      (this.activeCountOfPostSets - 1) * this.countOfCardOnPage,
      (this.activeCountOfPostSets - 1) * this.countOfCardOnPage +
        this.countOfCardOnPage
    );

    return currentPartOfMovies.map((movie, idx) => {
      switch (idx) {
        case 0:
          return new VideoCard(movie, this.gs);

        case 2:
          return new ImageCard(movie, this.gs);

        case 1:
          return new AudioCard(movie, this.gs);

        case 3:
          return new TextCard(movie, this.gs);
        default:
          return;
      }
    });
  }

  _setDefaultToDo() {
    this.gs.setState({ toDo: 'START_RENDER_DEFAULT_PAGE' });
  }

  _startToDrowDefaultPage() {
    this.handleSearchMovies();
  }

  _finishToDrowPage(movies, filteredMovies) {
    this.movies = movies;

    const moviesLenght = filteredMovies ? filteredMovies.length : movies.length;
    const movieList = this._drawCardList(
      filteredMovies ? filteredMovies : movies
    );
    if (this.findNode('.blog__main-btn-wrapper').getFoundNode()) {
      this.findNode('.blog__main-btn-wrapper').remove();
    }

    this.findNode('.blog__posts').truncate().append(movieList);
    if (moviesLenght > this.countOfCardOnPage) {
      this.after(new ReadMoreButton(this.gs, this.countOfCardOnPage));
    }
  }

  _searchedMoviesByTitle(prevState, nextState) {
    const areEqualSearch = prevState.search === nextState.search;
    if (areEqualSearch) return;

    const { search } = this.gs.getState();
    this.search = search;
    this.handleSearchMovies();
    return;
  }

  _showMorePosts(nextState) {
    const { movies, activeCountOfPostSets } = nextState;
    this.activeCountOfPostSets = activeCountOfPostSets;
    const exrtaMovieCards = this._drawCardList(
      this.filteredByAutorMovies ? this.filteredByAutorMovies : movies
    );
    this.findNode('.blog__posts').append(exrtaMovieCards);
  }

  _filteredMoviesByAuthor(prevState, nextState) {
    const areEqualFilter = prevState.author === nextState.author;

    if (areEqualFilter) return;

    const { movies, author, activeCountOfPostSets } = nextState;

    this.activeCountOfPostSets = activeCountOfPostSets;

    const filteredByAutorMovies = movies.filter(movie => {
      const { username } = movie.reviewInfo.author_details;
      if (username.toLowerCase().includes(author.toLowerCase())) return movie;
    });
    if (filteredByAutorMovies.length === 0) {
      this.findNode('.blog__tip').removeClass('blog__tip-display-off');
      setTimeout(() => {
        this.findNode('.blog__tip').addClass('blog__tip-display-off');
      }, 3000);
      return;
    }
    this.filteredByAutorMovies = filteredByAutorMovies;
    this.gs.setState({
      filteredMovies: filteredByAutorMovies
    });

    this._finishToDrowPage(movies, filteredByAutorMovies);
  }

  _render(prevState, nextState) {
    const { toDo } = nextState;

    switch (toDo) {
      case 'START_RENDER_DEFAULT_PAGE':
        this._startToDrowDefaultPage();

        break;
      case 'FINISH_ASYNC_QUERY':
        this.filteredByAutorMovies = '';
        this._finishToDrowPage(nextState.movies);
        break;
      case 'START_ASYNC_QUERY':
        return;
      case 'SEARCH_MOVIES_BY_TITLE':
        this._searchedMoviesByTitle(prevState, nextState);
        break;
      case 'SHOW_MORE_POSTS':
        this._showMorePosts(nextState);
        break;
      case 'FILTER_MOVIES_BY_AUTHOR':
        this._filteredMoviesByAuthor(prevState, nextState);
        break;
      default:
        break;
    }
  }
}
