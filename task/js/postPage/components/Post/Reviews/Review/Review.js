import { Component } from '../../../../../core/index.js';
import { Rating } from '../../../../../components/Rating/Rating.js';
import { Button } from '../../../../../components/Button/Button.js';

export class Review extends Component {
  constructor(review) {
    const { content, updated_at } = review;
    const { avatar_path, rating, username } = review.author_details;
    const APP_STORAGE_URL_AVATAR =
      'https://image.tmdb.org/t/p/w150_and_h150_face/';

    let currentAvatarPath;

    if (!avatar_path) {
      currentAvatarPath = './img/BlogPage/Post/noavatar.jpg';
    } else if (avatar_path.includes('http')) {
      currentAvatarPath = avatar_path.slice(avatar_path.indexOf('http'));
    } else {
      currentAvatarPath = APP_STORAGE_URL_AVATAR + avatar_path;
    }

    super({
      tagName: 'li',
      className: 'list__item',
      html: `
            <div class="list__img-wrapper">
            <img
                class="list__photo"
                src="${currentAvatarPath}"
                alt="avatar"
            />
        </div>
        <div class="list__block-wrapper">
            <div class="list__details-wrapper">
                <div class="list__details-wrapper_left">
                    <h3 class="list___subtitle">
                        ${username}
                    </h3>
                    
                </div>

                <div class="extra-data">
                    <img
                        src="./img/PostPage/icons/a-icon-time.svg"
                        alt="comment"
                    />
                    <div class="extra-data__data list__data-offset" >
                       
                    </div>
                </div>
            </div>

            <p class="list__text">
            </p>
            <div class="list__button-wrapper">
            </div>
        </div>
            `
    });
    this.comment = content;
    this.readingTime = updated_at;
    this.buttonText = '';

    this.cuttedComment = this._commentCut(content, 200);

    this.addListeners({ click: this.handleClick.bind(this) });

    this.findNode('.list__text').text(this.cuttedComment);
    this.findNode('.extra-data__data').text(this._formatReadingTime());

    if (this.buttonText === 'Read more') {
      this.findNode('.list__button-wrapper').append(
        new Button({
          className: 'list__button list__button-more',
          text: this.buttonText
        })
      );
    }

    this.findNode('.list__details-wrapper_left').append(
      new Rating({ rating: rating / 2 })
    );
  }

  _commentCut(text, limit) {
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    let lastSpace = text.lastIndexOf(' ');
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace);
    }
    this.buttonText = 'Read more';
    return text + '...';
  }

  handleClick(e) {
    const button = e.target;
    if (button.tagName !== 'BUTTON') return;

    switch (this.findNode('.list__button').getText()) {
      case 'Read more':
        this.findNode('.list__button').text('Read less');
        this.findNode('.list__text').text(this.comment);
        break;
      case 'Read less':
        this.findNode('.list__button').text('Read more');
        this.findNode('.list__text').text(this.cuttedComment);
        break;
    }
  }

  _formatReadingTime() {
    const countMsInTimeInterval = {
      year: 31622400000,
      month: 2419200000,
      week: 604800000,
      day: 86400000,
      hour: 3600000,
      minute: 60000,
      second: 1000
    };
    const releaseData = new Date(this.readingTime);
    const currentData = new Date();
    let readingTime = currentData - releaseData;

    if (readingTime > countMsInTimeInterval.year)
      return `${Math.floor(readingTime / countMsInTimeInterval.year)} yr read`;

    if (readingTime > countMsInTimeInterval.month)
      return `${Math.floor(
        readingTime / countMsInTimeInterval.month
      )} mnth read`;

    if (readingTime > countMsInTimeInterval.week)
      return `${Math.floor(readingTime / countMsInTimeInterval.week)} wk read`;

    if (readingTime > countMsInTimeInterval.day)
      return `${Math.floor(readingTime / countMsInTimeInterval.day)} dd read`;

    if (readingTime > countMsInTimeInterval.hour)
      return `${Math.floor(readingTime / countMsInTimeInterval.hour)} hr read`;

    if (readingTime > countMsInTimeInterval.minute)
      return `${Math.floor(
        readingTime / countMsInTimeInterval.minute
      )} min read`;

    if (readingTime > countMsInTimeInterval.second)
      return `${Math.floor(
        readingTime / countMsInTimeInterval.second
      )} sec read`;

    return `just now`;
  }
}
