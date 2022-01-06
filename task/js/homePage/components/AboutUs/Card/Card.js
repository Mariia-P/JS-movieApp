import { Component } from '../../../../core/index.js';


export class Card extends Component {
    constructor( {className, attrs, cardTitle, titleClassName} ) {
        super({
            className: `${className}`,
            html: `<img
            class="about-us__icon"
            src="${attrs.src}"
            alt="${attrs.alt}"
        />
        <h3 class="${titleClassName}">${cardTitle}</h3>
            `      
        }); 
    }

}