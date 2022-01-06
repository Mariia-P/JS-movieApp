import { Component } from '../../../../core/index.js';

export class Card extends Component {
    constructor( {alt, author, description, imgSrc, text, classExtra='', attrs} ) {
        super({
            className: `carousel__content ${classExtra}`,
            attrs: attrs,
            html: `<div class="carousel__info">
            <span class="carousel__brackets">“</span>
            <h3 class="carousel__text">
                ${text}
            </h3>
            <p class="carousel__name">${author}</p>
            <p class="carousel__description">
                ${description}
            </p>
        </div>
        <div class="carousel__photo">
            <img
                src="${imgSrc}"
                alt="${alt}"
            />
        </div>
            `      
        }); 
    }
}