import { Input } from '../../../components/Input/Input.js';
import { Component } from '../../../core/index.js';

const DEFAULT_INPUT_ATTRS = {
  type: 'text',
  autocomplete: 'off'
};

export class InputWithIcon extends Component {
  constructor({
    wrapperClassName,
    src,
    alt,
    inputClassname,
    wrapperAttrs = {},
    inputAttrs = DEFAULT_INPUT_ATTRS,
    gs
  } = {}) {
    super({
      className: wrapperClassName,
      attrs: wrapperAttrs,
      html: `
      <img
          class="dropdown__icon"
          src="${src}"
          alt="${alt}"
        />
      <select class="dropdown__select">
         <option value="movie">Movie title</option>
         <option value="author">Author</option>
      </select>
            `
    });

    this.gs = gs;
    this.validSearch = false;
    this.clicked = e => {
      const search = e.target;
      if (search.tagName !== 'IMG' || !this.validSearch) return;
      this._setSearchMovie();
    };

    this.oninput = e => {
      const input = e.target;
      if (input.tagName !== 'INPUT') return;
      const string = e.target.value;
      const validString = this._validateInputValue(string);
      e.target.value = validString;
    };

    this.clickHandler = this.clicked.bind(this);
    this.inputHandler = this.oninput.bind(this);

    this.addListeners({
      //
      click: this.clickHandler,
      input: this.inputHandler
    }).append(
      new Input({
        className: inputClassname,
        attrs: {
          ...inputAttrs,
          type: inputAttrs.type || DEFAULT_INPUT_ATTRS.type,
          autocomplete:
            inputAttrs.autocomplete || DEFAULT_INPUT_ATTRS.autocomplete
        }
      })
    );
  }

  _setSearchMovie() {
    const searchValue = this.findNode('.dropdown__input').getValue();
    if (!searchValue) return;

    const selectValue = this.findNode('.dropdown__select').getValue();
    if (selectValue === 'movie') {
      localStorage.setItem('lastMovieSearch', searchValue);
      localStorage.removeItem('lastAuthorFilter');
      this.gs.setState({
        author: '',
        search: searchValue,
        selectOption: selectValue,
        toDo: 'SEARCH_MOVIES_BY_TITLE'
      });
    }
    if (selectValue === 'author') {
      localStorage.setItem('lastAuthorFilter', searchValue);
      this.gs.setState({
        author: searchValue,
        selectOption: selectValue,
        activeCountOfPostSets: 1,
        toDo: 'FILTER_MOVIES_BY_AUTHOR'
      });
    }
  }

  _validateInputValue(string) {
    const reg = /^[A-Z][a-z \d,.!:?'-]{5,61}$/g;
    if (reg.test(string)) {
      this.validSearch = true;
      this.findNode('.dropdown__input').removeClass('dropdown__input-error');
    } else {
      this.validSearch = false;
      this.findNode('.dropdown__input').addClass('dropdown__input-error');
    }
    return string;
  }
}
