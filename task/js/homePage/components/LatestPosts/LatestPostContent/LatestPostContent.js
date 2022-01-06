import { Component } from '../../../../core/index.js';
import { Card } from '../Card/Card.js';


export class LatestPostsContent extends Component {
    constructor( cards ) {
        super({
            className: 'posts__wrapper'
                     
        }); 

        const cardList = this._drawCardList(cards);
        this.findNode('.posts__wrapper').append(cardList);
    }
    _drawCardList(cards) {
        return cards.map(card => new Card(card))
        .slice(0, 3);
    }

}