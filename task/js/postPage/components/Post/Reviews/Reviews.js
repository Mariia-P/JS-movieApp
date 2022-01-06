import { Component } from '../../../../core/index.js';
import { Review } from '../Reviews/Review/Review.js';

export class Reviews extends Component {
  constructor(reviews) {
    super({
      className: 'reviews',
      html: `
            <h2 class="reviews__title">Reviews</h2>

            <div class="list">
                <ul class="list__wrapper">
                    <li class="list__line"><div class=""></div></li>       
                </ul>
                <div class="list__comments-button">
                   
                </div>
            </div>
        
            `
    });

    const reviewsList = this._drawReviewsList(reviews);

    this.findNode('.list__wrapper').append(reviewsList);
    if (reviews.length > 4) {
      this.findNode('.list__comments-button').html(`
            <button class="btn-secondary">
            More comments
        </button>
        `);
    }
  }

  _drawReviewsList(reviews) {
    return (
      reviews
        //
        .map(review => new Review(review))
        .slice(1, 4)
    );
  }
}
