import { Component } from '../../../core/Component.js';
import { Button } from '../../../components/Button/Button.js';

export class Navigator extends Component {
  constructor({
    mediator,
    className,
    html,
    actions,
    classNameOfDirectorButton,
    htmlDirectorButton = '',
    classNameOfDirectorButtonsWrapper
  }) {
    super({
      className,
      html
    });

    this.classNameOfDirectorButton = classNameOfDirectorButton;
    this.classNameOfDirectorButtonsWrapper = classNameOfDirectorButtonsWrapper;
    this.htmlDirectorButton = htmlDirectorButton;
    mediator.subscribe(actions, this);
    this.mediator = mediator;

    this.clicked = e => {
      const button = e.target;
      if (button.tagName !== 'BUTTON') return;
      const director = button.dataset.name;
      if (director) {
        mediator.getMovies(director);
      } else {
        const movieId = button.dataset.movie;
        if (movieId) {
          mediator.setState({ selectMovie: movieId, action: 'SHOW_MOVIE' });
        }
      }
    };

    this.clickHandler = this.clicked.bind(this);

    this.addListeners({
      click: this.clickHandler
    });
  }

  _drawDirectorButtons(directors) {
    let buttons = directors.map(({ directorName }) => {
      return new Button({
        className: this.classNameOfDirectorButton,
        attrs: {
          'data-name': directorName
        },
        title: `Select ${directorName}`,
        html: `${directorName}${this.htmlDirectorButton}`
      });
    });

    this.findNode(`.${this.classNameOfDirectorButtonsWrapper}`).append(buttons);
    this.findNode(`.${this.classNameOfDirectorButton}`).addClass('btn__active');
  }

  _highlightMovieButton(id) {
    this.findNode('.btn__movie-active')
      .removeClass('btn__movie-active')
      .findNode(`[data-movie='${id}']`)
      .addClass('btn__movie-active');
  }
}
