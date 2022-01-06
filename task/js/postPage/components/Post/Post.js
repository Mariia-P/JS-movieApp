import { Component } from '../../../core/index.js';
import { AudioCard } from '../Post/AudioCard/AudioCard.js';
import { TextCard } from '../Post/TextCard/TextCard.js';
import { ImageCard } from '../Post/ImageCard/ImageCard.js';
import { VideoCard } from '../Post/VideoCard/VideoCard.js';
import { Reviews } from '../Post/Reviews/Reviews.js';

export class Post extends Component {
  constructor({ movie, review, allReviews, type }) {
    // console.log('[allReviews]', allReviews);
    super({
      tagName: 'section',
      className: 'main__content-wrapper'
    });
    const card = this._drawCard(movie, type, review.content);
    this.findNode('.main__content-wrapper')
      .prepend(card);
    
      if(allReviews.length>2){
        this.findNode('.main__content-wrapper').append(new Reviews(allReviews));
      }
      
  }
  _drawCard(movie, type, content) {
    switch (type) {
      case 'video':
        return new VideoCard(movie, content);

      case 'image':
        return new ImageCard(movie, content);

      case 'audio':
        return new AudioCard(movie, content);

      case 'text':
        return new TextCard(movie, content);
    }
  }
}
