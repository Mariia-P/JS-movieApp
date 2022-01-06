import { Main } from './Main.js';
import { Mediator, render } from '../core/index.js';

const requestData = {
  APP_MOVIEDB_API_KEY: '21c712341de03d01527deec02ff522f8',
  APP_MOVIEDB_URL: 'https://api.themoviedb.org/3',
  APP_STORAGE_URL: 'https://image.tmdb.org/t/p/w500'
};

const fetchMovies = async search => {
  let searchQuery = search.replaceAll(' ', '%20');

  try {
    let url = `${requestData.APP_MOVIEDB_URL}/search/person?api_key=${requestData.APP_MOVIEDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (movies) {
        
        if (!movies.results.length) {
          throw new Error('invalid query');
        }
       
        mediator.setState({
          movies: movies.results[0].known_for,
          isLoading: false,
          selectDirector: search,
          action: 'FINISHED_GET_MOVIES'
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

const mediator = new Mediator({
  initialState: {
    directors: [],
    selectDirector: '',
    movies: [],
    selectMovie: '',
    action: ''
  },
  fetchMovies: fetchMovies
});

 (async () => {

  try {
    let url = `${requestData.APP_MOVIEDB_URL}/movie/popular?api_key=${requestData.APP_MOVIEDB_API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (movies) {
        if (!movies.results.length) {
          throw new Error('invalid query');
        }
        let fetchedDirectorDetails = [];

        movies.results.slice(0, 3).forEach((movie, ind, array) => {
          const { id } = movie;

          const url = `${requestData.APP_MOVIEDB_URL}/movie/${id}/credits?api_key=${requestData.APP_MOVIEDB_API_KEY}&language=en-US`;
          fetch(url)
            .then(function (response) {
              return response.json();
            })
            .then(function (response) {
              if (response.crew.length) {
                let director = response.crew.filter(
                  elem => elem.job === 'Director'
                );
                fetchedDirectorDetails.push({
                  directorId: director[0].id,
                  directorName: director[0].name
                });
              }
              if (ind === array.length - 1) {
                mediator.setState({
                  directors: fetchedDirectorDetails,
                  action: 'RENDER_DIRECTOR_BUTTONS'
                });
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
})();

function createErrorMessage(message) {
  const errorMessage = document.querySelector('.blog');

  errorMessage.innerHTML = `
    <div class="blog__empty-posts">
      <h2 class="blog__empty-message">
        ${message}
      </h2>
    </div>
    `;
}

const props = {
  mediator
};

render(new Main(props), document.getElementById('blog'));
