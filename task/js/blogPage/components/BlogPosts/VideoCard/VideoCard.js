import { BlogCard } from '../BlogCard/BlogCard.js';

export class VideoCard extends BlogCard {
  constructor({ moviesInfo, reviewInfo, reviews }) {
    const APP_STORAGE_URL = 'https://image.tmdb.org/t/p/w500';
    const DEFAULT_VIDEO_IMG = './img/BlogPage/Post/Imgage-post-1.png';
   
    super({
      moviesInfo,
      reviewInfo,
      tagName: 'section',
      className: 'movie',
      htmlMediaInfo: `<div class="blog__content-left">
            <div class="movie__wrapper">
            <img    class="movie__batton"
                    src="./img/HomePage/icon/a-icon-play.svg"
                    alt= "play"
                />
                <img class="movie__poster" 
                    src="${
                      moviesInfo.backdrop_path
                        ? APP_STORAGE_URL + moviesInfo.backdrop_path
                        : DEFAULT_VIDEO_IMG
                    }"
                    alt= "poster"
                />
            </div>
        </div>
            `,
      htmlTextContentWrapperClassName: 'blog__content-right',
      iconSrc: './img/BlogPage/icons/posts/a-icon-playmini.svg',
      textContentLimit: 200,
      reviews,
      type: 'video'
    });
  }
}
