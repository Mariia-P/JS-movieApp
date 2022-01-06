import { Component } from '../../../../core/index.js';
import { TextContent } from '../TextContent/TextContent.js';
import { Network } from '../../../../components/Network/Network.js';

export class TextCard extends Component {
  constructor(movie, content) {
    super({
      className: 'text-card',
      html: `
    <div class="main__textBottom">
        <div class="like">
        <div class="like__icon">
            </div> 
            <p>${Math.floor(movie.popularity)} likes</p>
            </div>   
    </div>
            `
    });

    this.findNode('.main__textBottom').before(new TextContent(content, movie.overview));
    this.findNode('.main__textBottom').append(
      new Network({ classExtra: 'main__network-offset' })
    );
  }
}
