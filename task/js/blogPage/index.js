import { Main } from './Main.js';
import { GlobalState, render } from '../core/index.js';
import { data } from '../assets/database/blog.js';

const { blog } = data;

const requestData = {
  APP_MOVIEDB_API_KEY: '21c712341de03d01527deec02ff522f8',
  APP_MOVIEDB_URL: 'https://api.themoviedb.org/3',
  APP_STORAGE_URL: 'https://image.tmdb.org/t/p/w500'
};

let search =
  localStorage.getItem('lastMovieSearch') !== null
    ? localStorage.getItem('lastMovieSearch')
    : '';
let author =
  localStorage.getItem('lastAuthorFilter') !== null
    ? localStorage.getItem('lastAuthorFilter')
    : '';

const gs = new GlobalState({
  initialState: {
    activePost: 0,
    isLoading: false,
    search: search,
    author: '',
    movies: [],
    filteredMovies: [],
    selectOption: 'movie',
    activeCountOfPostSets: 1,
    toDo: ''
  }
});

const fetchMovies = async searchQuery => {
  gs.setState({ isLoading: true, toDo: 'START_ASYNC_QUERY' });

  try {
    let url;
    if (searchQuery) {
      url = `${requestData.APP_MOVIEDB_URL}/search/movie?api_key=${requestData.APP_MOVIEDB_API_KEY}&query=${searchQuery}`;
    } else {
      url = `${requestData.APP_MOVIEDB_URL}/movie/popular?api_key=${requestData.APP_MOVIEDB_API_KEY}&language=en-US&page=1`;
    }

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (movies) {
        if (!movies.results.length) {
          throw new Error('invalid query');
        }
        let fetchedMoviesDetails = [];

        movies.results.slice(0, 15).forEach((movie, ind, array) => {
          const { id } = movie;
          const url = `${requestData.APP_MOVIEDB_URL}/movie/${id}/reviews?api_key=${requestData.APP_MOVIEDB_API_KEY}&language=en-US&page=1`;
          fetch(url)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              if (response.results.length) {
                fetchedMoviesDetails.push({
                  moviesInfo: movie,
                  reviewInfo: {
                    ...response.results[0],
                    countOfcomments: response.results.length
                  },
                  reviews: response.results
                });
              }
              if (ind === array.length - 1) {
                if (!fetchedMoviesDetails.length) {
                  throw new Error('no reviewes on your query');
                }

                gs.setState({
                  movies: fetchedMoviesDetails,
                  search: searchQuery,
                  isLoading: false,
                  activeCountOfPostSets: 1,
                  filteredMovies: [],
                  author: author,
                  toDo: author
                    ? 'FILTER_MOVIES_BY_AUTHOR'
                    : 'FINISH_ASYNC_QUERY'
                });
                author = '';
              }
            })
            .catch(e => {
              createErrorMessage('There no reviewes according to your query');
              console.log('[e]', e);
            });
        });
      })
      .catch(e => {
        createErrorMessage('There no movies according to your query');
        console.log('[e]', e);
      });
  } catch (e) {
    createErrorMessage('Try again');
    console.log('[e]');
  }
};
function createErrorMessage(message) {
  const errorMessage = document.querySelector('.blog__posts');
  const moreButton = document.querySelector('.blog__main-btn-wrapper');
  errorMessage.innerHTML = `
    <div class="blog__empty-posts">
      <h2 class="blog__empty-message">
        ${message}
      </h2>
    </div>
    `;
  if (moreButton) {
    moreButton.remove();
  }
}

const props = {
  gs,
  ...blog,
  fetchMovies
};

render(new Main(props), document.getElementById('blog'));
