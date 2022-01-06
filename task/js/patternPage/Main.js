import { Component } from '../core/index.js';
import { MovieCard } from './components/MovieCard.js';
import { SideNavigator } from './components/SideNavigator.js';
import { TopNavigator } from './components/TopNavigator.js';

export class Main extends Component {
  constructor({ mediator }) {
    super({ className: 'pattern-wrapper' });

    this.findNode('.pattern-wrapper').append([
      new TopNavigator(mediator),
      new MovieCard(mediator),
      new SideNavigator(mediator)
    ]);
  }
}
