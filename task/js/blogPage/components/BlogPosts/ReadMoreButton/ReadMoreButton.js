import { Component } from '../../../../core/index.js';
import { Button } from '../../../../components/Button/Button.js';

export class ReadMoreButton extends Component {
  constructor(gs, countOfCardOnPage) {
    super({
      className: 'blog__main-btn-wrapper'
    });
    this.gs = gs;
    this.countOfCardOnPage = countOfCardOnPage;
    this.clicked = e => {
      const readMoreButton = e.target;
      if (readMoreButton.tagName !== 'BUTTON') return;
      this._setCountOfPostSets();
    };

    this.clickHandler = this.clicked.bind(this);

    this.findNode('.blog__main-btn-wrapper')
      .addListeners({ click: this.clickHandler })
      .append(
        new Button({
          className: 'btn-primary',
          text: 'Read more'
        })
      );
  }

  _setCountOfPostSets() {
    const { movies, filteredMovies, activeCountOfPostSets } =
      this.gs.getState();
    const length = filteredMovies.length
      ? filteredMovies.length
      : movies.length;
    if ((activeCountOfPostSets + 1) * this.countOfCardOnPage >= length) {
      this.remove();
    }
    this.gs.setState({
      activeCountOfPostSets: activeCountOfPostSets + 1,
      toDo: 'SHOW_MORE_POSTS'
    });
  }
}
