import { Component } from '../../../../core/index.js';
import { ExtraData } from '../../../../components/ExtraData/ExtraData.js';


export class Card extends Component {
    constructor( {alt, extraData, imgSrc, text, title} ) {
        super({
            className: 'post__card',
            html: `<div class="post_img-wrapper">
            <img
                class="post_img"
                src="${imgSrc}"
                alt="${alt}"
            />
        </div>

        <div class="post__title-wrapper">
            <a class="post__title">
                ${title}
            </a>
        </div>
        <p class="post__text">
            ${text.slice(0, 220)}...
        </p>
            `      
        }); 

        this.findNode('.post__card')
            .append(
                new ExtraData(extraData)
            );
    }

}