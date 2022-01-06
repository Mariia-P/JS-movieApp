import { Component } from '../../../../core/index.js';


export class Card extends Component {
    constructor( {imgSrc, alt, text, title, attrs} ) {
        super({
            className: 'portfolio__card',
            attrs: attrs,
            html: `<div class="portfolio__blok">
            <img src="${imgSrc}" alt="${alt}" class="portfolio__img">
           <h2 class="portfolio-title">${title}</h2>
           <p class="portfolio-sub-title">
               ${text}
           </p>
           <div class="cardMenu">
               <div class="cardMenu__attach">
                   <img
                       src="./img/HomePage/icon/a-icon-attach.svg"
                       alt="attach"
                   />
               </div>
               <div class="cardMenu__search">
                   <img
                       src="./img/HomePage/icon/a-icon-search-1.svg"
                       alt="search"
                   />
               </div>
           </div>
       </div>
            `      
        }); 


    }

}