import { Component } from '../core/index.js';
import { TitleWithoutText } from '../components/TitleWithoutText/TitleWithoutText.js';
import { InputWithIcon } from '../blogPage/components/InputWithIcon/InputWithIcon.js';
import { BlogPosts } from '../blogPage/components/BlogPosts/BlogPosts.js';

export class Main extends Component {
  constructor({ title, cards, gs, fetchMovies }) {
    super({ className: 'blog-wrapper' });

    this.findNode('.blog-wrapper').append([
      new TitleWithoutText(title),
      new InputWithIcon({
        wrapperClassName: 'dropdown',
        inputClassname: 'dropdown__input',
        alt: 'search',
        src: './img/BlogPage/icons/a-icon-search-3.svg',

        inputAttrs: {
          type: 'text',
          value: '',
          placeholder: 'Search by ...',
          minlength: '3',
          maxlength: '15',
          id: 'Input'
        },
        gs
      }),
      new BlogPosts(gs, fetchMovies)
    ]);
  }
}
