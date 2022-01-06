import { Component } from '../../core/index.js';
import { Rating } from '../../components/Rating/Rating.js';

export class ExtraData extends Component {
    constructor({
        amountComents,
        data,
        time,
        classExtra = '',
        rating = false
    }) {
        super({
            className: `extra-data ${classExtra}`,
            html: ` 
            <div class="extra-data__data">${data}</div>
            <div class="dot"></div>
            <div class="extra-data__time">${time}</div>
            <div class="dot"></div>
            <img
                src="./img/HomePage/icon/a-icon-comment.svg"
                alt="comment"
            />
            <div class="extra-data__comments">${amountComents}</div>
            `
        });
        if (rating|| rating===0) {
            this.findNode('.extra-data').append(new Rating({ rating }));
            this.findNode('.extra-data__comments').addClass(
                'extra-data__comments-right'
            );
        }
    }
}
