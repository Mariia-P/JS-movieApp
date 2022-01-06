import { BlogCard } from '../BlogCard/BlogCard.js';

export class ImageCard extends BlogCard {
    constructor({ moviesInfo, reviewInfo, reviews }) {
        const APP_STORAGE_URL = 'https://image.tmdb.org/t/p/w500';
        const DEFAULT_IMAGE_IMG = './img/BlogPage/Post/Image-post-3.png';
        

        super({
            moviesInfo,
            reviewInfo,
            reviews,
            tagName: 'section',
            className: 'image',
            htmlMediaInfo: `<div class="blog__content-left">
            <div class="image__wrapper">
                <img class="image__poster"
                src="${
                    moviesInfo.backdrop_path
                        ? APP_STORAGE_URL + moviesInfo.backdrop_path
                        : DEFAULT_IMAGE_IMG
                }"
                alt="poster"
            />
            </div>
        </div>
      
            `,
            htmlTextContentWrapperClassName: 'blog__content-right',
            iconSrc: './img/BlogPage/icons/posts/a-icon-picture.svg',
            textContentLimit: 200,
            type: 'image'
        });
    }
}
