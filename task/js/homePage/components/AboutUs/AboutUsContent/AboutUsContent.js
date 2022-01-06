import { Component } from '../../../../core/index.js';
import { Card } from '../Card/Card.js';


export class AboutUsContent extends Component {
    constructor( cards, video ) {
        super({
            className: 'about-us__content-wrapper',
            html: `<div class="about-us__side">
                           
            </div>
            <div class="about-us__video">
                <img
                    src="${video.src}"
                    alt="${video.alt}"
                />
            </div>
            `           
        }); 

        const cardList = this._drawCardList(cards);

        this.findNode('.about-us__side').append(cardList);
    }
    _drawCardList(cards) {
        return cards.map(card => new Card(card))
        .slice(0, 3);
    }

}