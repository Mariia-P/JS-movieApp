export class GlobalState {
    constructor({ initialState }) {
        this._state = initialState;
        this._prevState = { ...initialState };
        this._subscribers = [];
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

    subscribe(subscriber) {
        this._subscribers.push(subscriber);
    }

    _notify() {
        for (const subscriber of this._subscribers) {
            subscriber._render(this._prevState, this._state);
        }
    }
}
