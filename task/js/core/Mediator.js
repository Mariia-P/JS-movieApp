export class Mediator {
  constructor({ initialState, fetchMovies }) {
    this._state = initialState;
    this._prevState = { ...initialState };
    this._subscribers = [];
    this.searchMovies = director => fetchMovies(director);
  }

  getState() {
    return this._state;
  }

  setState(updatedState) {
    const nextState = {
      ...this._state,
      ...updatedState
    };
    this._prevState = this._state;
    this._state = nextState;

    this._notify();
  }

  subscribe(actions, subsriber) {
    actions.forEach(action => {
      this._subscribers[action] = this._subscribers[action] || [];
      this._subscribers[action].push(subsriber);
    });
  }

  getMovies(director) {
    this.searchMovies(director);
  }

  _notify() {
    const { action } = this._state;

    if (this._subscribers[action]) {
      this._subscribers[action].forEach(subscriber =>
        subscriber._render(this._state)
      );
    }
  }
}
