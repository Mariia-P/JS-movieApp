import { BlogCard } from '../BlogCard/BlogCard.js';

export class AudioCard extends BlogCard {
    constructor({ moviesInfo, reviewInfo, reviews }) {
        const APP_STORAGE_URL = 'https://image.tmdb.org/t/p/w500';
        const DEFAULT_AUDIO_IMG = './img/BlogPage/Group/Imgage-post-2.png';
       

        super({
            moviesInfo,
            reviewInfo,
            reviews,
            tagName: 'section',
            className: 'audio',
            htmlMediaInfo: `<div class="blog__content-left">
            <div class="audio__wrapper">
                <img class="audio__poster"
                    src="${
                        moviesInfo.backdrop_path
                            ? APP_STORAGE_URL + moviesInfo.backdrop_path
                            : DEFAULT_AUDIO_IMG
                    }"
                    alt="poster"
                />
            </div>
        </div>
        
            `,
            htmlTextContent: `
            <audio
                class="audio__audio-player"
                controls
            src="./audio/m83_outro.mp3"
            >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
            `,
            htmlTextContentWrapperClassName: 'blog__content-right',
            iconSrc: './img/BlogPage/icons/posts/a-icon-melody.svg',
            textContentLimit: 100,
            type: 'audio'
        });
    }
}
