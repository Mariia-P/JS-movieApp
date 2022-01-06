import { BlogCard } from '../BlogCard/BlogCard.js';

export class TextCard extends BlogCard {
    constructor({ moviesInfo, reviewInfo, reviews }) {
        super({
            moviesInfo,
            reviewInfo,
            reviews,
            tagName: 'section',
            className: 'text',

            htmlTextContentWrapperClassName: 'blog__content-center',
            iconSrc: './img/BlogPage/icons/posts/a-icon-text.svg',
            textContentLimit: 500,
            type: 'text'
        });
    }
}
