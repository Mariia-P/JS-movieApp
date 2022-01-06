import { Button } from '../../components/Button/Button.js';
import { Navigator } from './Navigator/Navigator.js';

export class TopNavigator extends Navigator {
  constructor(mediator) {
    super({
      mediator,
      className: 'top__navigator',
      html: `
            <section class="top__buttons-wrapper">
            </section>
            <section class="bottom__buttons-wrapper">
            </section>
            `,
      actions: ['RENDER_DIRECTOR_BUTTONS', 'FINISHED_GET_MOVIES', 'SHOW_MOVIE'],
      classNameOfDirectorButton: 'preview__btn-secondary',
      classNameOfDirectorButtonsWrapper: 'top__buttons-wrapper'
    });
  }

  _drowMoviesButton(movies, director) {
    this.findNode('.btn__active')
      .removeClass('btn__active')
      .findNode(`[data-name='${director}']`)
      .addClass('btn__active');

    const movieButtons = movies.map(({ original_title, id }) => {
      return new Button({
        className: 'top__movie-button',
        attrs: {
          'data-movie': id
        },
        title: `Select ${original_title}`,
        text: original_title
      });
    });
    this.findNode('.bottom__buttons-wrapper').truncate().append(movieButtons);
    this.findNode('.top__movie-button').addClass('btn__movie-active');
  }

  _render(payload) {
    const { action } = payload;

    switch (action) {
      case 'RENDER_DIRECTOR_BUTTONS':
        this._drawDirectorButtons(payload.directors);
        break;
        
      case 'FINISHED_GET_MOVIES':
        this._drowMoviesButton(payload.movies, payload.selectDirector);
        break;

      case 'SHOW_MOVIE':
        this._highlightMovieButton(payload.selectMovie);
        break;

      default:
        break;
    }
  }
}
