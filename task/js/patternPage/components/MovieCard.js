import { Component } from '../../core/index.js';
import { Skeleton } from './Skeleton.js';

const APP_STORAGE_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_VIDEO_IMG = './img/BlogPage/Post/Imgage-post-1.png';

export class MovieCard extends Component {
  constructor(mediator) {
    super({
      className: 'video__navigator'
    });
    mediator.subscribe(['SHOW_MOVIE'], this);
    this.findNode('.video__navigator').append(new Skeleton());
  }

  _drawMovie(movie) {
    const [currentMovie] = movie;
    this.findNode('.video__navigator').truncate().html(`
        <div class="blog__content-left">
          <img class="movie__poster" 
              src="${
                currentMovie.backdrop_path
                  ? APP_STORAGE_URL + currentMovie.backdrop_path
                  : DEFAULT_VIDEO_IMG
              }"
          />
        </div>
                <h3 class="blog__content-title">${
                  currentMovie.original_title
                }</h3>
                <p class="blog__content-text">${currentMovie.overview}</p>
             
`);
  }

  _render(payload) {
    const { action, movies, selectMovie } = payload;

    switch (action) {
      case 'SHOW_MOVIE':
        this._drawMovie(movies.filter(movie => movie.id === +selectMovie));
        break;

      default:
        break;
    }
  }
}
