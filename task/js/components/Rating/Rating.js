import { Component } from '../../core/index.js';

export class Rating extends Component {
    constructor({ rating: current, max = 5 } = {}) {
        super({
            className: 'stars'
        });
        current = +current;
        const items = [];
        const currentRating = Number.isInteger(current)
            ? { current, isInteger: true }
            : { current: Math.floor(current), isInteger: false };
        for (let i = 0; i < max; i++) {
            if (i < currentRating.current) {
                items.push(`<img
                class="stars__img"
                src="./img/PostPage/icons/Star-1.svg"
                alt="star"
            />`);
                continue;
            }
            if (i === currentRating.current && !currentRating.isInteger) {
                items.push(`<img
                class="stars__img"
                src="./img/PostPage/icons/Group.svg"
                alt="star"
            />`);
                continue;
            }

            items.push(`<img
            class="stars__img"
            src="./img/PostPage/icons/Star-2.svg"
            alt="star"
        />`);
        }

        this.html(items.join(''));
    }
}
