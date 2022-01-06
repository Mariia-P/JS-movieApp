import { Component } from '../../../../core/index.js';
import { TextContent } from '../TextContent/TextContent.js';
import { Network } from '../../../../components/Network/Network.js';

export class VideoCard extends Component {
  constructor(movie, content) {
    const APP_STORAGE_URL = 'https://image.tmdb.org/t/p/w500';
    const DEFAULT_AUDIO_IMG = './img/BlogPage/Group/Imgage-post-2.png';

    super({
      className: 'video-card',
      html: `
            <div class="main__img">
            <img    class="main__play-batton"
            src="./img/HomePage/icon/a-icon-play.svg"
            alt= "play"
        />

        <img class="main__poster"
            src="${
              movie.backdrop_path
                ? APP_STORAGE_URL + movie.backdrop_path
                : DEFAULT_AUDIO_IMG
            }"
            alt="img of post"
        />
    </div>
    <div class="main__textBottom">
        <div class="like"><div class="like__icon">
        </div> <p>${Math.floor(movie.popularity)} likes</p></div>
        
    </div>
            `
    });

    this.findNode('.main__img').after(new TextContent(content, movie.overview));
    this.findNode('.main__textBottom').append(
      new Network({ classExtra: 'main__network-offset' })
    );
  }
}
