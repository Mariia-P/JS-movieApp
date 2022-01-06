import { Component } from '../../core/index.js';

export class Panel extends Component {
  constructor(buttons, mediator) {
    super({
      className: 'side__panel',
      html: buttons.join('')
    });
    mediator.subscribe(['SHOW_MOVIE'], this);
  }

  _highlightMovieButton(id) {
    this.findNode('.btn__movie-active')
      .removeClass('btn__movie-active')
      .findNode(`[data-movie='${id}']`)
      .addClass('btn__movie-active');
  }


  _render(payload) {
    const { action } = payload;

    switch (action) {
      case 'SHOW_MOVIE':
        this._highlightMovieButton(payload.selectMovie);
        break;

      default:
        break;
    }
  }
}
