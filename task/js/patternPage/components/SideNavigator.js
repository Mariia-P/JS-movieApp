import { Panel } from './Panel.js';
import { Navigator } from './Navigator/Navigator.js';

export class SideNavigator extends Navigator {
  constructor(mediator) {
   
    super({
      mediator,
      className: 'side__navigator',
      html: `
            <section class="categories main__side-block">
                <div class="categories__wrapper">
                    <h3 class="main__side-bold">Directors</h3>
                </div>

                <div class="accordion">
                   <div class="side__panel"> </div>
                </div>
            </section>
            `,
      actions: ['RENDER_DIRECTOR_BUTTONS', 'FINISHED_GET_MOVIES'],
      classNameOfDirectorButton: 'side__button',
      htmlDirectorButton: `<img
                            class="accordion__img accordion__img-closed"
                            src="./img/HomePage/icon/a-icon-arrow.svg"
                            alt="arrow"
                         />`,
      classNameOfDirectorButtonsWrapper: 'accordion'
    });
  }

  _drowMoviesButton(movies, director) {
    const movieButtons = movies.map(({ original_title, id }, idx) => {
      let className =
        idx === 0 ? 'side__panel-item btn__movie-active' : 'side__panel-item';
      return `<button data-movie="${id}" class=${className}>${original_title}</button>`;
    });

    this.findNode('.side__panel')
      .remove()
      .findNode('.btn__active')
      .removeClass('btn__active')
      .findNode(`[data-name='${director}']`)
      .addClass('btn__active')
      .after(new Panel(movieButtons, this.mediator));

    this.findNode('.side__panel-item').addClass('btn__movie-active');
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

      default:
        break;
    }
  }
}
